import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { FiClock } from 'react-icons/fi';
import Author from '../../components/Author';
import Calendary from '../../components/Calendary';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const readingTime = post.data.content.reduce((acc, content) => {
    const textBody = RichText.asText(content.body);

    const split = textBody.split(' ');
    const numberWords = split.length;

    const result = Math.ceil(numberWords / 200);
    return acc + result;
  }, 0);

  return (
    <>
      <Head>
        <title>Spacetraveling | {post.data.title}</title>
      </Head>
      <div className={styles.hero}>
        <img src={post.data.banner.url} alt={post.data.banner.alt} />
      </div>
      <main className={commonStyles.container}>
        <section className={styles.headerContent}>
          <h1>{post.data.title}</h1>
          <div>
            <Calendary publicationDate={post.first_publication_date} />
            <Author nameAuthor={post.data.author} />
            <div>
              <FiClock />
              {readingTime} min
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url ?? '/images/banner.svg',
        alt: response.data.banner.alt ?? 'Banner Spacetraveling',
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: { post },
  };
};
