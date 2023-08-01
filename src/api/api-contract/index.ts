import axios from 'axios';

import { ALCHEMY_POLYGON_MUMBAI_API } from '~/constants';

export const alchemyApi = axios.create({
  baseURL: ALCHEMY_POLYGON_MUMBAI_API,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
