import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import { useState } from 'react';
import {
  getPostsByUserId,
  getUserById,
  getUserByValidSessionToken,
  Post,
  User,
} from '../../util/database';
// import { ProfileResponseBody } from '../api/users/[userId]';
import Layout from '../components/Layout';

// const h1Style = css`
//   margin-top: 30px;
//   justify-content: center;
//   display: flex;
//   color: #d7839b;
//   gap: 40px;
// `;

// const yarnBallsStyle = css`
//   margin-top: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 40px;
// `;
const descriptionSectionStyle = css`
  display: flex;
  justify-content: space-between;
  background: #e4deca;
  padding: 20px 50px;
  border-radius: 20px;
  margin: 80px 200px;
  color: #d7839b;
  span {
    color: #779677;
    font-weight: normal;
  }
`;

const descriptionContentStyle = css`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  font-weight: bold;
  line-height: 40px;

  textarea {
    background: transparent;
    border: transparent;
    color: #779677;
    font-family: Syne;
    border-radius: 10px;
    width: 300px;
    height: 100px;
    :hover {
      border: 2px solid#779677;
      border-radius: 10px;
    }
  }
`;

const uploadButtonStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 250px;
`;

const addButtonStyle = css`
  background: #d7839b;
  color: white;
  width: 100px;
  height: 60px;
  border-radius: 38px;
  font-size: 18px;
  border: transparent;
  cursor: pointer;
  font-size: 40px;
`;

const h2Style = css`
  text-align: center;
  color: #779677;
`;

const imageSectionStyle = css`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 40px;
  flex-wrap: wrap;
  a {
    color: #d7839b;
    text-transform: none;
    text-decoration: none;
  }
`;

type Props = {
  user?: User;
  userObject: { username: string };
  posts: Post[];
  userId: number;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <Layout userObject={props.userObject}>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>User not found</h1>
      </Layout>
    );
  }
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Profile</title>

          <meta
            name="description"
            content={`Profile Page of ${props.user.username}`}
          />
        </Head>

        <div css={descriptionSectionStyle}>
          <img
            src={props.user.image}
            alt="profile pic"
            style={{ height: '100px', width: '100px' }}
          />
          <div css={descriptionContentStyle}>
            <div>
              Profile of{' '}
              <div>
                <span>{props.user.username}</span>
              </div>
              <div>bio</div>
              <div>{props.user.bio}</div>
              <div>
                <textarea />
              </div>
            </div>
          </div>
          <div css={uploadButtonStyle}>
            {props.userId === props.user.id && (
              <Link href="/upload">
                <a>
                  <button css={addButtonStyle}>+</button>
                </a>
              </Link>
            )}
          </div>
        </div>
        <div>
          {/* <h1 css={h1Style}>Profile of {props.user.username} !</h1>{' '} */}
          {/* <div css={yarnBallsStyle}>
            <Image src="/logo-pink.png" width="80px" height="80px" />
            <Image src="/logo.png" width="80px" height="80px" />
          </div> */}
        </div>

        <div>
          <div>
            <h2 css={h2Style}>knitties</h2>
          </div>

          <div css={imageSectionStyle}>
            {props.posts.map((post) => {
              return (
                <div key={`post-${post.id}`}>
                  <Link href={`/posts/${post.id}`}>
                    <a>
                      <div>
                        <Image
                          alt="uploaded post"
                          src={post.image}
                          width="300px"
                          height="300px"
                        />
                      </div>
                      <p>{post.title}</p>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
}

// Code in getServerSideProps runs only in
// Node.js, and allows you to do fancy things:
// - Read files from the file system
// - Connect to a (real) database
//
// getServerSideProps is exported from your files
// (ONLY FILES IN /pages) and gets imported
// by Next.js

export async function getServerSideProps(
  context: GetServerSidePropsContext,
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<GetServerSidePropsResult<{}>> {
  const userId = context.query.userId;
  const posts = await getPostsByUserId(Number(userId));

  // User id is not correct type
  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }

  const user = await getUserById(parseInt(userId));
  // if there is not user found
  if (!user) {
    context.res.statusCode = 404;
    return {
      // notFound: true, // also works, but generates a generic error page
      props: {},
    };
  }
  const sessionToken = context.req.cookies.sessionToken;
  const loggedInUser = await getUserByValidSessionToken(sessionToken);

  if (!loggedInUser) {
    return {
      props: {
        error: 'You need to be logged in!',
      },
    };
  }
  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props

  return {
    props: {
      user: user,
      posts: posts,
      userId: loggedInUser.id,

      // userId: session?.id,
    },
  };
}
