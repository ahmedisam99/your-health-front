import { Link, useLocation } from 'react-router-dom';
import { Image, Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';

import home from 'assets/icons/home.png';
import users from 'assets/icons/users.png';
import orders from 'assets/icons/orders.png';
import reports from 'assets/icons/reports.png';
import complaints from 'assets/icons/complaints.png';
import profile from 'assets/icons/profile.png';
import logout from 'assets/icons/logout.png';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';

const { Sider } = Layout;

export default function DoctorSidebar() {
  const location = useLocation();

  const selectedKeys = [
    '/',
    '/patients',
    '/orders',
    '/reports',
    '/complaints',
    '/profile',
    '/logout',
  ]
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
          <Link to='/'>الرئيسية</Link>
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
                <Image preview={false} src={orders} width={25} />
              )}
            />
          }>
          <Link to='/orders'>الطلبات</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='3'
          icon={
            <Icon
              component={() => (
                <Image preview={false} src={reports} width={25} />
              )}
            />
          }>
          <Link to='/reports'>التقارير</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='4'
          icon={
            <Icon
              component={() => (
                <Image preview={false} src={complaints} width={25} />
              )}
            />
          }>
          <Link to='/complaints'>الشكاوي</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='5'
          icon={
            <Icon
              component={() => (
                <Image preview={false} src={profile} width={25} />
              )}
            />
          }>
          <Link to='/profile'>الملف الشخصي</Link>
        </Menu.Item>

        <Menu.Item
          className='yh-w-100'
          key='6'
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
