import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { isAddress } from 'viem';

import { POLYGONSCAN_MUMBAI_API_KEY } from '~/constants';
import { encodeParams } from '~/utils/params';

import { polygonscanApi } from '..';

export interface GetTransferRequest {
  address: string;
}
export interface TransferResponse {
  blockNumber: string;
  timeStamp: string; // 1690911791
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  input: string;
  type: string;
  gas: string;
  gasUsed: string;
  traceId: string;
  isError: string;
  errCode: string;
}

export interface GetTransferResponse {
  result: TransferResponse[];
}

export const usePolygonscanGetTransfer = (
  params: GetTransferRequest,
  options?: UseQueryOptions<GetTransferResponse>
) =>
  useQuery<GetTransferResponse>(
    ['polygonscan', 'get', 'get-transfer', params],
    () => getTransferAxios(params),
    {
      keepPreviousData: true,
      enabled: isAddress(params.address),
      ...options,
    }
  );

const getTransferAxios = async (data: GetTransferRequest) =>
  (
    await polygonscanApi.get<GetTransferResponse>(
      `api/${encodeParams({
        module: 'account',
        action: 'txlistinternal',
        apikey: POLYGONSCAN_MUMBAI_API_KEY,
        sort: 'desc',
        address: data.address,
      })}`
    )
  ).data;
