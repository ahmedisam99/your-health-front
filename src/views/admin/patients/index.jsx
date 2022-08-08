import { Col, Row, Typography } from 'antd';
import { useQuery } from 'react-query';

import AdminLayout from 'components/admin/AdminLayout';
import { adminGetPatients } from 'api/admin';

export default function AdminPatientsView() {
  const { data: patients, isLoading } = useQuery('admin-pat', adminGetPatients);

  console.log('patients', patients);

  return (
    <AdminLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>قائمة المرضى</Typography.Title>
        </Col>
      </Row>
    </AdminLayout>
  );
}
