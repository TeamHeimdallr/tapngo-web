import { setupWorker } from 'msw';

import mockAPIs from './api';

const mockServiceWorker = setupWorker(...mockAPIs);
export default mockServiceWorker;
