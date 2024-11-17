import type { MockServerConfig } from 'mock-config-server';

import { requests } from './mock/requests';

export const restMockServerConfig: MockServerConfig = {
  staticPath: {
    path: '/mock/static',
    prefix: '/'
  },
  rest: {
    configs: Array.from(requests),
    baseUrl: '/api'
  }
};

export default restMockServerConfig;
