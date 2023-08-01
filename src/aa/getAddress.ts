import { ethers } from 'ethers';
import { Presets } from 'userop';

import config from '~/configs/config.json';

export default async function getAddress(pkey: string) {
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(pkey),
    config.rpcUrl
  );
  const address = simpleAccount.getSender();

  console.log(`SimpleAccount address: ${address}`);

  return address;
}
