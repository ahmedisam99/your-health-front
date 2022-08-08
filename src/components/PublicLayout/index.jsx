import { Layout } from 'antd';

import PublicNavbar from 'components/PublicNavbar';
import YhFooter from 'components/YhFooter';
import styles from './style.module.css';

const { Content } = Layout;

export default function PublicLayout({ children, isAdmin = false }) {
  return (
    <Layout>
      <PublicNavbar isAdmin={isAdmin} />

      <Content className={styles.content}>{children}</Content>

      <YhFooter />
    </Layout>
  );
}
