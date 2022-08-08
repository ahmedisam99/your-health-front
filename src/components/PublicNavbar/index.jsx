import { useLocation } from 'react-router-dom';
import { Button, Image, Layout, Menu, Space } from 'antd';

import logoWhite from 'assets/images/logo-white.png';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export default function PublicNavbar({ isAdmin }) {
  const location = useLocation();

  const selectedKeys = ['/', '/about', '/crew', '/contact']
    .map((path, idx) => (location.pathname === path ? idx.toString() : null))
    .filter(Boolean);

  return (
    <Header className={styles.header}>
      <Image
        preview={false}
        src={logoWhite}
        alt='logo'
        height='90%'
        width='auto'
      />

      {!isAdmin && (
        <Menu
          theme='dark'
          mode='horizontal'
          disabledOverflow
          selectedKeys={selectedKeys}>
          <Menu.Item key='0'>
            <Link to='/'>الرئيسية</Link>
          </Menu.Item>
          <Menu.Item key='1'>
            <Link to='/about'>من نحن</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/crew'>الطاقم الطبي</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/contact'>تواصل معنا</Link>
          </Menu.Item>
        </Menu>
      )}

      {!isAdmin && (
        <Space>
          <Button className='green-btn' type='primary'>
            <Link to='/login'>تسجيل الدخول</Link>
          </Button>
          <Button type='primary'>
            <Link to='/signup'>مستخدم جديد</Link>
          </Button>
        </Space>
      )}
    </Header>
  );
}
