import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Image,
  Input,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import Icon, { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import { MessageList } from 'react-chat-elements';

import {
  patientCreateComplaint,
  patientGetComplaints,
  patientGetMe,
} from 'api/patient';
import faceImg from 'assets/icons/face.png';
import styles from './style.module.css';
import PatientLayout from 'components/patient/PatientLayout';

export default function PatientComplaintsView() {
  const [admin, setAdmin] = useState({});
  const [complaint, setComplaint] = useState('');
  const [loading, setLoading] = useState(true);
  const { data: me } = useQuery('pat-me', patientGetMe);
  const {
    data: complaints,
    isLoading,
    isFetching,
  } = useQuery('pat-complaints', patientGetComplaints);
  const mutation = useMutation(patientCreateComplaint);
  const queryClient = useQueryClient();

  const onEmojiClick = (_, emoji) => {
    setComplaint(complaint + emoji.emoji);
  };

  const handleCreate = () => {
    if (!complaint) return;

    mutation.mutate(complaint, {
      onSuccess: () => {
        queryClient.refetchQueries('pat-complaints');
        setComplaint('');
      },
      onError: (error) => {
        message.error(
          error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
        );
      },
    });
  };

  useEffect(() => {
    if (complaints?.[0]?.fromModel === 'Patient') setAdmin(complaints?.[0]?.to);
    else setAdmin(complaints?.[0]?.from);
  }, [complaints]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setLoading(true);
      const elements = document.querySelectorAll('.rce-mbox-time.non-copiable');

      elements.forEach((element) => {
        const timeAgo = element.getAttribute('data-text');
        const timeAgoArr = timeAgo.split(' ');
        let number, ago;
        if (Number.isInteger(Number(timeAgoArr[0]))) {
          number = timeAgoArr[0];
          ago = timeAgoArr[1];
        } else if (Number.isInteger(Number(timeAgoArr[1]))) {
          number = timeAgoArr[1];
          ago = timeAgoArr[2];
        } else {
          number = 0;
          ago = 'just now';
        }

        const timeAgoArabicMap = {
          year: 'سنة',
          years: 'سنوات',
          months: 'شهر',
          month: 'أشهر',
          weeks: 'اسبوع',
          week: 'اسابيع',
          day: 'يوم',
          days: 'أيام',
          hour: 'ساعة',
          hours: 'ساعات',
          minute: 'دقيقة',
          minutes: 'دقائق',
          second: 'ثانية',
          seconds: 'ثواني',
          'just now': 'لحظة',

          سنة: 'سنة',
          سنوات: 'سنوات',
          شهر: 'شهر',
          أشهر: 'أشهر',
          اسبوع: 'اسبوع',
          اسابيع: 'اسابيع',
          يوم: 'يوم',
          أيام: 'أيام',
          ساعة: 'ساعة',
          ساعات: 'ساعات',
          دقيقة: 'دقيقة',
          دقائق: 'دقائق',
          ثانية: 'ثانية',
          ثواني: 'ثواني',
          لحظة: 'لحظة',
        };

        if (ago === 'لحظة' || ago === 'just now') {
          element.setAttribute('data-text', `منذ لحظة`);
        } else {
          element.setAttribute(
            'data-text',
            `منذ ${number} ${timeAgoArabicMap[ago]}`,
          );
        }
      });

      setLoading(false);
    }
  }, [admin, isFetching, isLoading]);

  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title className='yh-mb-0' level={2}>
            الشكاوى
          </Typography.Title>
        </Col>

        <Col span={24}>
          {loading ? (
            <Spin
              style={{ padding: 10, marginTop: 15 }}
              className='yh-center-row'
              size='large'
            />
          ) : (
            <div className={styles.chatContainer}>
              <div className={styles.chatHeader}>
                <Space
                  className='yh-h-100'
                  direction='horizontal'
                  align='center'
                  size={10}>
                  <Avatar
                    alt='Admin'
                    icon={<UserOutlined />}
                    src={admin?.profilePicture || ''}
                    size={40}
                  />

                  <Typography className='yh-wc'>مدير النظام</Typography>
                </Space>
              </div>

              <div className={styles.chatBody}>
                <MessageList
                  className='message-list'
                  lockable={true}
                  dataSource={complaints?.map((complaint) => ({
                    position:
                      complaint.fromModel === 'Patient' ? 'right' : 'left',
                    type: 'text',
                    title:
                      complaint.fromModel === 'Patient' ? 'أنا' : 'مدير النظام',
                    text: complaint.content,
                    date: new Date(complaint.createdAt),
                    status: 'received',
                  }))}
                />
              </div>

              <div className={styles.chatFooter}>
                <Badge color='green' offset={[0, 20]} dot>
                  <Avatar
                    alt='Patient'
                    icon={<UserOutlined />}
                    src={me.profilePicture}
                    size={50}
                  />
                </Badge>

                <Input
                  className={styles.chatFooterComplaintInput}
                  type='text'
                  placeholder='اكتب رسالتك هنا'
                  value={complaint}
                  size='small'
                  onChange={(e) => setComplaint(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;

                    handleCreate();
                  }}
                  suffix={
                    <Space direction='horizontal' align='center' size={10}>
                      <Dropdown
                        trigger={['click']}
                        overlay={<EmojiPicker onEmojiClick={onEmojiClick} />}>
                        <Image
                          style={{ cursor: 'pointer' }}
                          preview={false}
                          src={faceImg}
                          width={24}
                        />
                      </Dropdown>

                      <Icon
                        onClick={handleCreate}
                        className={styles.chatFooterActionsIcon}
                        component={SendOutlined}
                      />
                    </Space>
                  }
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </PatientLayout>
  );
}
