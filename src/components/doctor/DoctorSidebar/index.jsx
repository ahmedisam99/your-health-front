import { Image, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';

const { Sider } = Layout;

export default function DoctorSidebar() {
  return (
    <Sider className={styles.sidebar}>
      <div className={`yh-w-100 yh-center-all ${styles.logoContainer}`}>
        <Image
          preview={false}
          src={logoRed}
          alt='logo'
          width='65%'
          height='auto'
        />
      </div>

      <Menu theme='dark' mode='horizontal' disabledOverflow>
        <Menu.Item className='yh-w-100' key='0' icon={<UserOutlined />}>
          الرئيسية
        </Menu.Item>
        <Menu.Item className='yh-w-100' key='0' icon={<UserOutlined />}>
          قائمة المرضى
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
