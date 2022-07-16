import { Layout } from 'antd';

import PatientNavbar from '../PatientNavbar';
import PatientSidebar from '../PatientSidebar';
import styles from './style.module.css';

const { Content } = Layout;

export default function PatientLayout({ isProfileView = false, children }) {
  return (
    <Layout className={styles.layout}>
      <PatientSidebar />

      <Layout>
        <PatientNavbar />

        <Content
          className={isProfileView ? styles.profileContent : styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
