import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Col, Row, Space, Typography } from 'antd';
import Icon, {
  FilterFilled,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

import { doctorGetReports } from 'api/doctor';
import ReportsContext from 'contexts/ReportsContext';
import DoctorLayout from 'components/doctor/DoctorLayout';
import styles from './style.module.css';

export default function DoctorReportsView() {
  const { data: reports } = useQuery('doctor-reports', doctorGetReports, {
    staleTime: 0,
    cacheTime: 0,
  });
  const { value } = useContext(ReportsContext);

  return (
    <DoctorLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>التقارير</Typography.Title>
        </Col>

        <Col span={24}>
          <Row gutter={50}>
            <Col span={8}>
              <Space
                className={styles.card}
                direction='horizontal'
                align='center'
                size={40}>
                <Icon
                  className='yh-wc'
                  style={{ fontSize: 64 }}
                  component={FilterFilled}
                />

                <Space direction='vertical' align='center' size={10}>
                  <Typography.Title className='yh-wc' level={4}>
                    {reports?.numOfOrders || 0}
                  </Typography.Title>

                  <Typography.Title className='yh-wc' level={4}>
                    عينات قيد الإنتظار
                  </Typography.Title>
                </Space>
              </Space>
            </Col>

            <Col span={8}>
              <Space
                className={styles.card}
                direction='horizontal'
                align='center'
                size={40}>
                <Icon
                  className='yh-wc'
                  style={{ fontSize: 64 }}
                  component={UserOutlined}
                />

                <Space direction='vertical' align='center' size={10}>
                  <Typography.Title className='yh-wc' level={4}>
                    {reports?.numOfPatiens || 0}
                  </Typography.Title>

                  <Typography.Title className='yh-wc' level={4}>
                    عدد المرضى
                  </Typography.Title>
                </Space>
              </Space>
            </Col>

            <Col span={8}>
              <Space
                className={styles.card}
                direction='horizontal'
                align='center'
                size={40}>
                <Icon
                  className='yh-wc'
                  style={{ fontSize: 64 }}
                  component={UserSwitchOutlined}
                />

                <Space direction='vertical' align='center' size={10}>
                  <Typography.Title className='yh-wc' level={4}>
                    {value}
                  </Typography.Title>

                  <Typography.Title className='yh-wc' level={4}>
                    عدد المتعافيين
                  </Typography.Title>
                </Space>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </DoctorLayout>
  );
}
