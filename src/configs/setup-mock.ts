import mockServiceWorker from '~/_mocks_';
import { IS_MOCK } from '~/constants';

const setupMock = () => {
  if (!IS_MOCK) return;

  mockServiceWorker.start({ onUnhandledRequest: 'bypass' });
};

setupMock();
