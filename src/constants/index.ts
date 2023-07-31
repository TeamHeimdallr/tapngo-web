export const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';

export const IS_LOCAL = import.meta.env.VITE_START_ENV === 'local';
export const IS_DEV = import.meta.env.VITE_START_ENV === 'dev';
export const IS_STAGING = import.meta.env.VITE_START_ENV === 'staging';
export const IS_PROD = import.meta.env.VITE_START_ENV === 'prod';

export const IS_MAINNET = import.meta.env.VITE_BLOCKCHAIN_ENV === 'mainnet';

// 개발계 환경
export const DEV_ENV = IS_MOCK || IS_LOCAL || IS_DEV;
// 운영계 환경
export const PROD_ENV = IS_PROD || IS_STAGING;

// API ENDPOINT
export const API_URL = IS_PROD ? '' : IS_STAGING ? '' : IS_DEV ? '' : 'http://localhost:8080';

// FE ENDPOINT
export const BASE_URL = IS_PROD ? '' : IS_STAGING ? '' : IS_DEV ? '' : 'http://localhost:3000';

// ASSET ENDPOINT
export const ASSET_URL = '';

export const BREAKPOINT = {
  SM: 0,
  MD: 848,
  LG: 1280,

  MEDIA_SM: '(min-width: 0px)',
  MEDIA_MD: '(min-width: 848px)',
  MEDIA_LG: '(min-width: 1280px)',
};

// CHAIN ID
type Chain = 'ETH' | 'GOERLI';
export const CHAIN_ID: Record<Chain, number> = {
  ETH: 1,
  GOERLI: 5,
};
export const DEFAULT_CHAIN_ID = IS_MAINNET ? CHAIN_ID.ETH : CHAIN_ID.GOERLI;

type Contract = 'CONTRACT_NAME';
export const CONTRACT_ADDRESS: Record<Contract, `0x${string}`> = {
  CONTRACT_NAME: IS_MAINNET ? '0x' : '0x',
};

export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const PROVIDER_WSS_ENDPOINT = import.meta.env.VITE_PROVIDER_WSS_ENDPOINT;
export const PROVIDER_HTTP_ENDPOINT = import.meta.env.VITE_PROVIDER_HTTP_ENDPOINT;

export const TESTER_PRIVATE_KEY = import.meta.env.VITE_TESTER_PRIVATE_KEY;
