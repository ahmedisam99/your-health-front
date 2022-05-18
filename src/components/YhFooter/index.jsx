import { Layout, Space, Typography } from 'antd';

import styles from './style.module.css';

const { Footer } = Layout;

export default function YhFooter() {
  return (
    <Footer className={styles.footer}>
      <Space>
        <Typography.Text className='yh-gc'>جميع الحقوق محفوظة</Typography.Text>
        <Typography.Text className='yh-gc yh-fw-700'>|</Typography.Text>
        <Typography.Text className='yh-gc'>صحتكم</Typography.Text>
      </Space>

      <Space>
        <Typography.Text className='yh-gc'>سياسة الخصوصية</Typography.Text>
        <Typography.Text className='yh-gc yh-fw-700'>|</Typography.Text>
        <Typography.Text className='yh-gc'>شروط الاستخدام</Typography.Text>
        <Typography.Text className='yh-gc yh-fw-700'>|</Typography.Text>
        <Typography.Text className='yh-gc'>مركز المساعدة</Typography.Text>
      </Space>
    </Footer>
  );
}
