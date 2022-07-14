import { useState } from 'react';
import { ConfigProvider } from 'antd';
import {
  QueryClient,
  QueryClientProvider,
  setLogger as setReactQueryLogger,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ar from 'antd/lib/locale/ar_EG';

import Router from './router';
import ReportsContext from 'contexts/ReportsContext';

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
  const [reportsContextValue, setReportsContextValue] = useState(37);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider direction='rtl' locale={ar}>
        <ReportsContext.Provider
          value={{
            value: reportsContextValue,
            setValue: setReportsContextValue,
          }}>
          <Router />
        </ReportsContext.Provider>

        <ReactQueryDevtools />
      </ConfigProvider>
    </QueryClientProvider>
  );
}
