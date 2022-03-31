import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  // getCommentsByPostId,
  getPostById,
  Post,
  User,
  // User,
} from '../../util/database';
// import { CommentResponseBody } from '../api/comments';
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
  font-weight: bold;
  display: block;
  border-radius: 66px;
  margin-top: 40px;
  background: #e4deca;
  padding: 30px;
  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  textarea {
    font-family: Syne;
    width: 500px;
    color: #d7839b;
    margin-left: 30px;
  }
`;

const projectInfoStyle = css`
  button {
    background: transparent;
    border: transparent;
    cursor: pointer;
    justify-items: right;
  }
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
  margin-top: 40px;
  color: #779677;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const descriptionStyle = css`
  color: #d7839b;
  margin-bottom: 80px;
  font-style: italic;
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

const madeByStyle = css`
  color: #d7839b;
`;

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  post: Post;
  user: User;
  // userId: number;
  // username: string;
  // postComments: {
  //   id: number;
  //   user_id: number;
  //   post_id: number;
  //   content: string;
  //   username: string;
  // }[];
};

export default function SinglePost(props: Props) {
  const [commentFromUser, setCommentFromUser] = useState<string>('');
  const [isUserLogged, setIsUserLogged] = useState(props.userObject);
  // const [newComment, setNewComment] = useState(props.postComments);

  // state variables for editing inputs
  // const [newTitle, setNewTitle] = useState('');
  // const [newDescription, setNewDescription] = useState('');
  // const [newNeedleSize, setNewNeedleSize] = useState('');
  // const [newYarnName, setNewYarnName] = useState('');

  const router = useRouter();

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

    props.refreshUserProfile();
    await router.push('/');

    return deleteResponse;
  }

  // async function updatePostById(id: number) {
  //   const updateResponse = await fetch(`/api/posts/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       post: {
  //         title: newTitle,
  //         description: newDescription,
  //         needleSize: newNeedleSize,
  //         yarnName: newYarnName,
  //       },
  //     }),
  //   });
  //   const updateResponseBody =
  //     (await updateResponse.json()) as PostResponseBody;
  //   console.log(updateResponseBody);
  // }

  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title> Post</title>

          <meta name="description" content="SinglePost" />
        </Head>

        <div css={postStyle}>
          <div css={imageStyle}>
            <img src={props.post.image} alt="uploaded file" />
            <div css={likeCommentSection}>
              <button
                onClick={() => {
                  deletePostByPostId(props.post.id).catch(() => {});
                }}
              >
                <Image src="/delete.png" width="30px" height="30px" />
              </button>

              <span>
                {/* <button>
                  <Image src="/liked.png" width="30px" height="30px" />
                </button> */}
              </span>
            </div>
            <div css={commentSectionStyle}>
              <p>
                love letters{' '}
                <Image src="/liked.png" width="30px" height="30px" /> :
              </p>
              {/* <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const commentResponse = await fetch('api/comments', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      commentFromUser: commentFromUser,
                      userId: props.userId,
                      postId: props.post.id,
                      username: props.userObject.username,
                    }),
                  });
                  const commentResponseBody =
                    (await commentResponse.json()) as CommentResponseBody;

                  console.log('commentResponseBody', commentResponseBody);
                  setCommentFromUser('');

                  const newCommentsList = [newComment, commentResponseBody];

                  return;
                }}
              > */}
              <div>
                <textarea
                  value={commentFromUser}
                  onChange={(event) =>
                    setCommentFromUser(event.currentTarget.value)
                  }
                />
                <button>
                  <Image src="/comment.png" width="30px" height="30px" />
                </button>
              </div>
              {/* </form> */}

              {/* {newComment.length === 0 ? (
                <div> send a love letter </div>
              ) : (
                newComment.map((event) => {
                  return (
                    <div key={event.content}>
                      {event.username}: {event.content}
                    </div>
                  );
                })
              )} */}
            </div>
          </div>

          <div css={projectInfoStyle}>
            {/* <button>
              <Image
                alt="edit button"
                src="/edit.png"
                width="30px"
                height="30px"
              />
            </button> */}
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
            <div css={madeByStyle}>made by </div>
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

  // const postComment = await getCommentsByPostId(Number(postId));

  const post = await getPostById(parseInt(postId));
  // const username = await getUsernameByPostId(parseInt(postId));

  return {
    props: {
      post: post,
      postId: postId,
      // username: username,

      // postComment: postComment,
    },
  };
}
