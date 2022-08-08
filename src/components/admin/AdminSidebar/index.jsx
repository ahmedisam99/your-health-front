import { Link, useLocation } from 'react-router-dom';
import { Image, Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';

import home from 'assets/icons/home.png';
import users from 'assets/icons/users.png';
import logout from 'assets/icons/logout.png';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';

const { Sider } = Layout;

export default function AdminSidebar() {
  const location = useLocation();

  const selectedKeys = ['/doctors', '/patients', '/logout']
    .map((path, idx) => (location.pathname === path ? idx.toString() : null))
    .filter(Boolean);

  return (
    <Sider className={styles.sidebar} width={250}>
      <div className={`yh-w-100 yh-center-all ${styles.logoContainer}`}>
        <Image
          preview={false}
          src={logoRed}
          alt='logo'
          width='65%'
          height='auto'
        />
      </div>

      <Menu
        className={styles.menu}
        theme='dark'
        mode='horizontal'
        disabledOverflow
        selectedKeys={selectedKeys}>
        <Menu.Item
          className='yh-w-100'
          key='0'
          icon={
            <Icon
              component={() => <Image preview={false} src={home} width={25} />}
            />
          }>
          <Link to='/doctors'>قائمة الأطباء</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='1'
          icon={
            <Icon
              component={() => <Image preview={false} src={users} width={25} />}
            />
          }>
          <Link to='/patients'>قائمة المرضى</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='2'
          icon={
            <Icon
              component={() => (
                <Image preview={false} src={logout} width={25} />
              )}
            />
          }>
          <Link to='/logout'>تسجيل الخروج</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
