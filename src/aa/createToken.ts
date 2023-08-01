import { ethers } from 'ethers';
import { Client, Presets } from 'userop';

import { NFT_ABI } from '~/abi/nft';
import config from '~/configs/config.json';

export default async function createToken(pkey: string, nft: string) {
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
    config.paymaster.rpcUrl,
    config.paymaster.context
  );

  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(pkey),
    config.rpcUrl,
    { paymasterMiddleware }
  );
  const client = await Client.init(config.rpcUrl);

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const nftAddress = ethers.utils.getAddress(nft);
  const nftContract = new ethers.Contract(nftAddress, NFT_ABI, provider);

  const res = await client.sendUserOperation(
    simpleAccount.execute(
      nftContract.address,
      0,
      nftContract.interface.encodeFunctionData('createToken', [])
    ),
    {
      dryRun: false,
      onBuild: op => console.log('Signed UserOperation:', op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log('Waiting for transaction...');
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

  return ev?.transactionHash ?? null;
}
