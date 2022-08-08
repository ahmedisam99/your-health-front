import { Layout } from 'antd';

import DoctorNavbar from '../AdminNavbar';
import DoctorSidebar from '../AdminSidebar';
import styles from './style.module.css';

const { Content } = Layout;

export default function AdminLayout({ isProfileView = false, children }) {
  return (
    <Layout className={styles.layout}>
      <DoctorSidebar />

      <Layout>
        <DoctorNavbar />

        <Content
          className={isProfileView ? styles.profileContent : styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
