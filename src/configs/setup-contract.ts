import { Chain } from '@wagmi/core';
import { createPublicClient, createWalletClient, custom, http } from 'viem';

export const mumbai: Chain = {
  id: 80001,
  name: 'Mumbai',
  network: 'mumbai',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ['https://polygon-mumbai-bor.publicnode.com'],
    },
    default: {
      http: ['https://polygon-mumbai-bor.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Polygon Scan',
      url: 'https://mumbai.polygonscan.com/',
    },
  },
  testnet: true,
};

const publicClient = createPublicClient({
  chain: mumbai,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: mumbai,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transport: http(),
});

export { publicClient, walletClient };
