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

import { patientGetMe } from 'api/patient';
import styles from './style.module.css';

const { Header } = Layout;

export default function PatientNavbar() {
  const { data: user } = useQuery('pat-me', patientGetMe);

  return (
    <Header className={styles.navbar}>
      <Space direction='horizontal' align='center' size={15}>
        <Badge color='green' offset={[0, 20]} dot>
          <Avatar
            alt='Patient'
            icon={<UserOutlined />}
            src={user.profilePicture}
            size={40}
          />
        </Badge>

        <Typography.Text className='yh-wc'>{user.name}</Typography.Text>
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
