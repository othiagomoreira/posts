import { FiCalendar } from 'react-icons/fi';
import { formatDate } from '../../utils/format';

import styles from './calendary.module.scss';

interface CalendaryProps {
  publicationDate: string;
}

export default function Calendary({
  publicationDate,
}: CalendaryProps): JSX.Element {
  return (
    <time className={styles.calendary}>
      <FiCalendar />
      {formatDate(publicationDate)}
    </time>
  );
}
