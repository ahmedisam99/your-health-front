import { ConfigProvider } from 'antd';
import {
  QueryClient,
  QueryClientProvider,
  setLogger as setReactQueryLogger,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ar from 'antd/lib/locale/ar_EG';

import Router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 65,
      refetchOnWindowFocus: false,
    },
  },
});

setReactQueryLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider direction='rtl' locale={ar}>
        <Router />

        <ReactQueryDevtools />
      </ConfigProvider>
    </QueryClientProvider>
  );
}
