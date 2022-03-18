import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getPostById, Post } from '../../util/database';
import Layout from '../components/Layout';

type Props = {
  userObject: { username: string };
  post: Post;
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
        <img src={props.post.image} alt="uploaded file" />
        <div>{props.post.title}</div>
        <div>{props.post.description}</div>
        <div>{props.post.needleSize}</div>
        <div>{props.post.yarnName}</div>
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
