import { FiUser } from 'react-icons/fi';

import styles from './author.module.scss';

interface AuthorProps {
  nameAuthor: string;
}

export default function Author({ nameAuthor }: AuthorProps): JSX.Element {
  return (
    <div className={styles.author}>
      <FiUser />
      {nameAuthor}
    </div>
  );
}
