import { Col, Row, Typography } from 'antd';
import { useQuery } from 'react-query';

import AdminLayout from 'components/admin/AdminLayout';
import { adminGetDoctors } from 'api/admin';

export default function AdminDoctorsView() {
  const { data: doctors, isLoading } = useQuery(
    'admin-doctors',
    adminGetDoctors,
  );

  console.log('doctors', doctors);

  return (
    <AdminLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>قائمة الأطباء</Typography.Title>
        </Col>
      </Row>
    </AdminLayout>
  );
}
