import { ethers } from 'ethers';
import { Client, Presets } from 'userop';

import config from '~/configs/config.json';

export default async function transfer(pkey: string, t: string, amt: string) {
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

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);
  const res = await client.sendUserOperation(simpleAccount.execute(target, value, '0x'), {
    dryRun: false,
    onBuild: op => console.log('Signed UserOperation:', op),
  });
  console.log(`UserOpHash: ${res.userOpHash}`);
  return res.userOpHash ?? null;

  // console.log('Waiting for transaction...');
  // const ev = await res.wait();
  // console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

  // return ev?.transactionHash ?? null;
}
