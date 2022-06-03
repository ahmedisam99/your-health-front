import Icon from '@ant-design/icons';

import HeartPulseSvg from 'components/icons/heart-with-pulse.svg';
import styles from './style.module.css';

export default function DashboardLoading() {
  return (
    <div className={styles.dashboardLoading}>
      <Icon
        className={styles.icon}
        component={() => (
          <HeartPulseSvg
            heartClassName={styles.heart}
            pulseClassName={styles.pulse}
          />
        )}
      />
    </div>
  );
}
