import {
  AutoComplete,
  Avatar,
  Badge,
  Input,
  Layout,
  Space,
  Typography,
} from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import styles from './style.module.css';
import { adminGetMe } from 'api/admin';

const { Header } = Layout;

export default function AdminNavbar() {
  const { data: user } = useQuery('admin-me', adminGetMe);

  return (
    <Header className={styles.navbar}>
      <Space direction='horizontal' align='center' size={15}>
        <Badge color='green' offset={[0, 20]} dot>
          <Avatar
            alt='Admin'
            icon={<UserOutlined />}
            src={user.profilePicture}
            size={40}
          />
        </Badge>

        <Typography.Text style={{ direction: 'ltr' }} className='yh-wc'>
          {user.email}
        </Typography.Text>
      </Space>

      <AutoComplete
        className={styles.autoComplete}
        dropdownClassName={styles.borderRadius}
        options={[]}>
        <Input
          className={styles.borderRadius}
          placeholder='بحث'
          prefix={<SearchOutlined style={{ fontSize: 24 }} />}
        />
      </AutoComplete>
    </Header>
  );
}
