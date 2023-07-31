import { goerli, mainnet } from '@wagmi/chains';
import { w3mProvider } from '@web3modal/ethereum';
import { getDefaultConfig } from 'connectkit';
import { configureChains, createConfig } from 'wagmi';

import { IS_MAINNET, WALLETCONNECT_PROJECT_ID } from '~/constants';

const chainsConfig = IS_MAINNET ? [mainnet] : [goerli];
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...chainsConfig],
  [w3mProvider({ projectId: WALLETCONNECT_PROJECT_ID })]
);

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    appName: '',
    appUrl: '',
    appIcon: '',

    publicClient,
    webSocketPublicClient,

    chains,
  })
);

export { chains, config };
