import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Calendary from '../components/Calendary';
import Author from '../components/Author';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface HomeProps {
  next_page: string;
  results: Post[];
}

export default function Home({ next_page, results }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(results);
  const [nextPage, setNextPage] = useState(next_page);

  async function handleGetMorePosts(): Promise<void> {
    const response = await fetch(nextPage);
    const json = await response.json();

    setPosts([...posts, ...json.results]);
    setNextPage(json.next_page);
  }

  return (
    <>
      <Head>
        <title>Spacetraveling | Posts</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={commonStyles.container}>
        <section className={styles.posts}>
          {posts.map(post => (
            <a href={`/post/${post.uid}`} key={post.uid}>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>

              <div>
                <Calendary publicationDate={post.first_publication_date} />
                <Author nameAuthor={post.data.author} />
              </div>
            </a>
          ))}
        </section>

        {nextPage && (
          <button
            type="button"
            className={styles.buttonPosts}
            onClick={handleGetMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('posts', { pageSize: 2 });

  const { results, next_page } = postsResponse;

  return { props: { next_page, results } };
};
