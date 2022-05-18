import { ConfigProvider } from 'antd';
import ar from 'antd/lib/locale/ar_EG';

import Router from './router';

export default function App() {
  return (
    <ConfigProvider direction='rtl' locale={ar}>
      <Router />
    </ConfigProvider>
  );
}
