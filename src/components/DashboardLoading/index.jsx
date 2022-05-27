import Icon from '@ant-design/icons';

import HeartSvg from 'components/icons/heart.svg';
import styles from './style.module.css';

export default function DashboardLoading() {
  return (
    <div className={styles.dashboardLoading}>
      <Icon
        className={styles.icon}
        component={() => (
          <HeartSvg
            heartClassName={styles.heart}
            pulseClassName={styles.pulse}
          />
        )}
      />
    </div>
  );
}
