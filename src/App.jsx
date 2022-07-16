import { useState } from 'react';
import { ConfigProvider } from 'antd';
import {
  QueryClient,
  QueryClientProvider,
  setLogger as setReactQueryLogger,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ar from 'antd/lib/locale/ar_EG';
import { initializeApp } from 'firebase/app';

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

const firebaseConfig = {
  apiKey: 'AIzaSyBPpRhgd0-ZYuMVJfXyoZ1NPAncaU1oXo0',
  authDomain: 'your-health-65d9d.firebaseapp.com',
  projectId: 'your-health-65d9d',
  storageBucket: 'your-health-65d9d.appspot.com',
  messagingSenderId: '779327902887',
  appId: '1:779327902887:web:43fa6b8ec16edc07d27782',
};

export default function App() {
  const [reportsContextValue, setReportsContextValue] = useState(32);
  initializeApp(firebaseConfig);

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
