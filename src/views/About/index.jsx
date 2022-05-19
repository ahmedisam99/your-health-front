import { Col, Image, Row, Space, Typography } from 'antd';

import PublicLayout from 'components/PublicLayout';
import pulseImage from 'assets/images/pulse.png';
import styles from './style.module.css';

export default function AboutView() {
  return (
    <PublicLayout>
      <div className={styles.about}>
        <Row gutter={[0, 35]} justify='center'>
          <Col>
            <Space direction='horizontal' align='center' size={20}>
              <Image preview={false} src={pulseImage} alt='Pulse' />
              <Typography.Title className={styles.title} level={1}>
                من نحن
              </Typography.Title>
              <Image preview={false} src={pulseImage} alt='Pulse' />
            </Space>
          </Col>

          <Col span={24} />

          <Col>
            <Typography.Title level={2}>
              تطبيق صحتكم يقدم تطبيق الرعاية المنزلية الصحية
            </Typography.Title>
          </Col>

          <Col span={24}>
            <Row gutter={[25, 25]} justify='center'>
              <Col span={12}>
                <div className={styles.card}>
                  <Space
                    className='yh-w-100'
                    direction='vertical'
                    align='center'
                    size={15}>
                    <Image preview={false} src={pulseImage} width={220} />

                    <Typography.Title className='yh-pc' level={2}>
                      رؤيتنا
                    </Typography.Title>

                    <Typography.Paragraph
                      className={[styles.grey, styles.para]}>
                      ان يكون تطبيق طب الأسرة ، الرعايه المنزليه الصحيه هو الاول
                      والافضل للتواصل بين وحدات الرعاية الصحية المنزلية والمرضي
                      في جميع المناطق.
                    </Typography.Paragraph>
                  </Space>
                </div>
              </Col>

              <Col span={12}>
                <div className={styles.card}>
                  <Space
                    className='yh-w-100'
                    direction='vertical'
                    align='center'
                    size={15}>
                    <Image preview={false} src={pulseImage} width={220} />

                    <Typography.Title className='yh-pc' level={2}>
                      مهمتنا
                    </Typography.Title>

                    <Typography.Paragraph
                      className={[styles.grey, styles.para]}>
                      مهمة العناية والرعاية الصحية و راحة المريض وتلقي العلاج في
                      المنزل من خلال توفير كافة سبل الرعاية الصحية المنزلية
                      للمريض بالمنزل مع متابعة شاملة وملف طبي كامل من خلال
                      التطبيق .
                    </Typography.Paragraph>
                  </Space>
                </div>
              </Col>

              <Col span={12}>
                <div className={styles.card}>
                  <Space
                    className='yh-w-100'
                    direction='vertical'
                    align='center'
                    size={15}>
                    <Image preview={false} src={pulseImage} width={220} />

                    <Typography.Title className='yh-pc' level={2}>
                      قيمنا
                    </Typography.Title>

                    <Typography.Paragraph
                      className={[styles.grey, styles.para]}>
                      رعاية من القلب تطبيق الرعاية المنزلية الصحية يقدم أفضل
                      حلول الرعاية الصحية الذكية باستخدام احدث التقنيات الطبية
                      العالمية
                    </Typography.Paragraph>
                  </Space>
                </div>
              </Col>

              <Col span={12}>
                <div className={styles.card}>
                  <Space
                    className='yh-w-100'
                    direction='vertical'
                    align='center'
                    size={15}>
                    <Image preview={false} src={pulseImage} width={220} />

                    <Typography.Title className='yh-pc' level={2}>
                      اهدافنا
                    </Typography.Title>

                    <Typography.Paragraph
                      className={[styles.grey, styles.para]}>
                      ترسيخ قيـم إنسانية اندثــرت أو كادت في ظـل طغيان المـادة
                      على جميع مناحي الحياة و من أغلب فئات المجتمع ناسين أو
                      متناسين أننا أمــة الجسد الواحــد الذي إذا اشتــكى منه عضو
                      تـداعى له ســائر الجسد بالسهر والحمى .
                    </Typography.Paragraph>
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </PublicLayout>
  );
}
