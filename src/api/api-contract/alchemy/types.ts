import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * common
 */
export type Category = 'external' | 'internal' | 'erc20' | 'erc721' | 'erc1155' | 'specialnft';

/**
 * Get Asset Transfers
 */

/**
 * request
 */
export interface GetAssetTransfers {
  walletAddress: `0x${string}`;
}

export interface GetAssetTransfersRequestParams {
  contractAddresses?: `0x${string}`[];
  category: Category[];
  fromAddress?: `0x${string}`;
  toAddress?: `0x${string}`;
  fromBlock?: string;
  toBlock?: string;
  order?: 'asc' | 'desc';
  withMetadata?: boolean;
  excludeZeroValue?: boolean;
  maxCount?: string;
  pageKey?: string;
}

export interface GetAssetTransfersRequest {
  id?: number;
  jsonrpc?: string;
  method: 'alchemy_getAssetTransfers';
  params?: GetAssetTransfersRequestParams[];
}

/**
 * response
 */
export interface RawContract {
  value: string | null;
  address: string | null;
  decimal: string | null;
}
export interface Metadata {
  blockTimestamp: string;
}
export interface Erc1155Metadata {
  toeknId: string;
  value: string;
}
export interface Transfers {
  category: Category;
  blockNum: string;
  from: string;
  to: string | null;
  value: string | null;
  erc721TokenId: string | null;
  erc1155Metadata: Erc1155Metadata[] | null;
  tokenId: string;
  asset: string | null;
  uniqueId: string;
  hash: string;
  rawContract: RawContract;
  metadata: Metadata;
}

export interface GetAssetTransfersResponseResult {
  pageKey?: string;
  transfers: Transfers[];
}
export interface GetAssetTransfersResponse {
  id: number;
  jsonrpc: string;
  result: GetAssetTransfersResponseResult;
}

export type UseAlchemyPostAssetTransfers = UseMutationOptions<
  Transfers[],
  AxiosError<Transfers[], GetAssetTransfers>,
  GetAssetTransfers
>;
