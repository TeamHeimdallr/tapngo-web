import { createPublicClient, createWalletClient, http } from 'viem';
import { Chain } from 'viem/chains';

import { PROVIDER_HTTP_ENDPOINT } from '~/constants';

export const polygonMumbai: Chain = {
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
      http: [PROVIDER_HTTP_ENDPOINT],
    },
    default: {
      http: [PROVIDER_HTTP_ENDPOINT],
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
  chain: polygonMumbai,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: polygonMumbai,
  transport: http(),
});

export { publicClient, walletClient };
