import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getPostById, Post } from '../../util/database';
import { DeletePostResponseBody } from '../api/posts/[postId]';
import Layout from '../components/Layout';

const postStyle = css`
  display: flex;
  justify-content: center;
`;

const imageStyle = css`
  display: block;
  margin-top: 50px;
`;

const likeCommentSection = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-right: 20px;

  button {
    background: transparent;
    border: transparent;
    cursor: pointer;
  }
  span {
    display: flex;
    gap: 40px;
  }
`;

const commentSectionStyle = css`
  color: #779677;
  display: flex;
  border-radius: 66px;
  background: #e4deca;
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
  // postId: number;
};

export default function SinglePost(props: Props) {
  // const [comment, setComment] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  async function deletePostByPostId(id: number) {
    const deleteResponse = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: id,
      }),
    });
    /*  const deletePostResponseBody =
      (await deleteResponse.json()) as DeletePostResponseBody;
    console.log('deletePostResponseBody', deletePostResponseBody);

    const newPostList = posts.filter((post) => {
      return deletePostResponseBody.props.post.id !== post.id;
    }); */
    // setPosts(newPostList);

    return deleteResponse;
  }

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
              <button
                onClick={() => {
                  console.log('I was clicked');
                  deletePostByPostId(props.post.id).catch(() => {});
                }}
              >
                <Image src="/delete.png" width="30px" height="30px" />
              </button>

              <span>
                <button>
                  <Image src="/comment.png" width="30px" height="30px" />
                </button>
                <button>
                  <Image src="/liked.png" width="30px" height="30px" />
                </button>
              </span>
            </div>
            <div>
              <p css={commentSectionStyle}>Comment Section:</p>
              {/* <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const commentResponse = await fetch('api/comment', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      comment: comment,
                      userId: props.userId,
                      postId: props.postId,
                    }),
                  });
                  const newComment = await commentResponse.json();
                  setComment('');
                  console.log('new comment', newComment);
                }}
              >
              <textarea
                value={comment}
                onChange={(event) => setComment(event.currentTarget.value)}
              />
              <button>add comment</button>
              {/* </form> */}
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

  // const comment = await getCommentsByPostId(parseInt(postId));

  const post = await getPostById(parseInt(postId));

  return {
    props: {
      post: post,
      postId: postId,
      // comment: comment,
    },
  };
}
