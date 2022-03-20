import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getPostById, Post } from '../../util/database';
import Layout from '../components/Layout';

const postStyle = css`
  display: flex;
  justify-content: center;
`;

const imageStyle = css`
  display: block;
  margin-top: 50px;

  border-radius: 66px;
`;

const likeCommentSection = css`
  display: flex;
  justify-content: flex-end;
  gap: 40px;
`;

const commentSectionStyle = css`
  color: #779677;
  display: flex;
  border-radius: 66px;
  background: #e4deca; ;
`;

const projectInfoStyle = css`
  border: solid 10px #957666;
  border-radius: 66px;
  width: 543px;
  height: 600px;
  margin: 50px 50px;
  padding: 50px;
  box-shadow: 5px 10px 20px #957666;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const titleStyle = css`
  color: #779677;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const descriptionStyle = css`
  color: #d7839b;
  margin-bottom: 80px;
`;

const needleSizeStyle = css`
  margin-bottom: 40px;
  margin-top: 20px;
  color: #d7839b;
`;

const yarnNameStyle = css`
  margin-bottom: 40px;
  margin-top: 20px;
  color: #d7839b;
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

        <div css={postStyle}>
          <div css={imageStyle}>
            <img src={props.post.image} alt="uploaded file" />
            <div css={likeCommentSection}>
              <p>like</p>
              <p>comment</p>
            </div>
            <div>
              <p css={commentSectionStyle}>Comment Section:</p>
            </div>
          </div>

          <div css={projectInfoStyle}>
            <div css={titleStyle}>{props.post.title}</div>
            <div css={descriptionStyle}>{props.post.description}</div>
            <Image
              alt="knitting needle icon"
              src="/needle.png"
              width="30px"
              height="30px"
            />
            <div css={needleSizeStyle}>{props.post.needleSize}</div>
            <Image
              alt="knitting needle icon"
              src="/wool.png"
              width="30px"
              height="30px"
            />
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
