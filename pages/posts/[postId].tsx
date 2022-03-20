import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getPostById, Post } from '../../util/database';
import Layout from '../components/Layout';

const postStyle = css`
  display: flex;
  justify-content: center;
`;

const imageStyle = css`
  display: block;
  margin-top: 50px;
`;

const projectInfoStyle = css`
  border: solid 10px #957666;
  border-radius: 66px;
  width: 543px;
  height: 600px;
  margin: 30px 50px;
  padding: 50px;
  box-shadow: 5px 10px 20px #957666;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  color: #779677;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const descriptionStyle = css`
  color: #d7839b;
  margin-bottom: 40px;
`;

const needleSizeStyle = css`
  background: #e4deca;
  margin-bottom: 40px;
`;

const yarnNameStyle = css`
  background: #e4deca;
  margin-bottom: 40px;
`;

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
        <div css={postStyle}>
          <div css={imageStyle}>
            <img src={props.post.image} alt="uploaded file" />
          </div>

          <div css={projectInfoStyle}>
            <div css={titleStyle}>{props.post.title}</div>
            <div css={descriptionStyle}>{props.post.description}</div>
            <div css={needleSizeStyle}>{props.post.needleSize}</div>
            <div css={yarnNameStyle}>{props.post.yarnName}</div>
          </div>
        </div>
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
