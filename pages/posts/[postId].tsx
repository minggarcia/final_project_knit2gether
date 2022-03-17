import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getPostById } from '../../util/database';
import Layout from '../components/Layout';

type Props = {
  userObject: { username: string };
};

export default function SinglePost(props: Props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>My Post</title>

          <meta name="description" content="SinglePost" />
        </Head>
        <h1> Single Post Page</h1>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // id we get after the slash in the URL

  const postId = context.query.postId;

  if (!postId || Array.isArray(postId)) {
    return { props: {} };
  }

  const post = await getPostById(parseInt(postId));

  return {
    props: {
      post: post,
    },
  };
}
