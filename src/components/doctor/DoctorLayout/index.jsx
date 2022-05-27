import { Layout } from 'antd';

import DoctorNavbar from '../DoctorNavbar';
import DoctorSidebar from '../DoctorSidebar';
import styles from './style.module.css';

const { Content } = Layout;

export default function DoctorLayout({ children }) {
  return (
    <Layout className={styles.layout}>
      <DoctorSidebar />

      <Layout>
        <DoctorNavbar />

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
