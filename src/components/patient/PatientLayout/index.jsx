import { Layout } from 'antd';

import PatientNavbar from '../PatientNavbar';
import PatientSidebar from '../PatientSidebar';
import styles from './style.module.css';

const { Content } = Layout;

export default function PatientLayout({ children }) {
  return (
    <Layout className={styles.layout}>
      <PatientSidebar />

      <Layout>
        <PatientNavbar />

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}
