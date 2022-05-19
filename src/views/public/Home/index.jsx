import { Button, Input, Space, Typography } from 'antd';

import PublicLayout from 'components/PublicLayout';
import styles from './style.module.css';

export default function HomeView() {
  return (
    <PublicLayout>
      <div className={styles.home}>
        <Typography.Title className={['yh-fw-400', styles.lh]} level={1}>
          تمكِّن العديد من التقنيات طبيبك <br /> أو فريق الرعاية الصحية من{' '}
          <br /> مراقبة حالتك الصحية عن بُعد
        </Typography.Title>

        <br />

        <Space direction='vertical' align='start' size={10}>
          <Typography.Title className={['yh-fw-500', styles.lh]} level={4}>
            الإشتراك للحصول على النشرة الاخبارية الخاصة بـ كوفيد-19
          </Typography.Title>

          <Input
            className={styles.borderRadius}
            placeholder='البريد الإلكتروني'
            type='email'
            suffix={
              <Button
                className={styles.borderRadius}
                type='primary'
                size='large'>
                ابدأ الان
              </Button>
            }
          />
        </Space>
      </div>
    </PublicLayout>
  );
}
