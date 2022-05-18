import { Layout } from 'antd';

import PublicNavbar from 'components/PublicNavbar';
import YhFooter from 'components/YhFooter';
import styles from './style.module.css';

const { Content } = Layout;

export default function PublicLayout({ children }) {
  return (
    <Layout>
      <PublicNavbar />

      <Content className={styles.content}>{children}</Content>

      <YhFooter />
    </Layout>
  );
}
