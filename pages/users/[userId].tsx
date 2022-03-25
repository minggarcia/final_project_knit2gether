import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  getPostsByUserId,
  getUserById,
  getUserByValidSessionToken,
  Post,
  User,
} from '../../util/database';
import { ProfileResponseBody } from '../api/users/[userId]';
import Layout from '../components/Layout';

const descriptionSectionStyle = css`
  display: flex;
  justify-content: center;
  background: #e4deca;
  padding: 20px 50px;
  border-radius: 20px;
  margin: 80px 200px;
  color: #d7839b;
`;

const descriptionContentStyle = css`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

const bioStyle = css`
  color: #779677;
  display: flex;
  justify-content: center;
  align-items: center;
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
  p {
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
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadImage = async (event: any) => {
    const files = event.currentTarget.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'profilepictures');
    setLoading(true);

    const response = await fetch(
      `	https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const file = await response.json();

    setProfilePic(file.secure_url);
    setLoading(false);
  };

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
        {/* <div>
          <h1>Welcome {props.user.username}!</h1>
        </div> */}
        <div css={descriptionSectionStyle}>
          <div css={descriptionContentStyle}>
            <div>'picture' </div>
            <div>{props.user.username}</div>
            <div>knitties</div>
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const profileResponse = await fetch(`/api/users/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: props.userId,
                image: profilePic,
                bio: bio,
              }),
            });

            const uploadResponseBody =
              (await profileResponse.json()) as ProfileResponseBody;

            console.log('uploadResponseBody', uploadResponseBody);
          }}
        >
          <div>
            <input type="file" onChange={uploadImage} />
            <div>
              {loading ? (
                <div>
                  {' '}
                  <img src="/loading.gif" alt="loading" />
                </div>
              ) : (
                <img
                  src={profilePic}
                  alt="profile"
                  height="400px"
                  width="400px"
                />
              )}
            </div>
          </div>
          <div>
            <textarea
              placeholder="add a bio"
              value={bio}
              onChange={(event) => setBio(event.currentTarget.value)}
            />
          </div>
          <button>refresh profile</button>
        </form>

        <div>
          <Link href="/upload">
            <a>
              <button css={addButtonStyle}>+</button>
            </a>
          </Link>

          <div>
            <h2 css={h2Style}>my knitties</h2>
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
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  const userId = context.query.userId;
  const posts = await getPostsByUserId(parseInt(userId));
  // const sessionToken = context.req.cookies.sessionToken;
  // const session = await getUserByValidSessionToken(sessionToken);
  // if (!session) {
  //   return {
  //     props: {
  //       error: 'You need to be logged in!',
  //     },
  //   };
  // }

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

  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props

  return {
    props: {
      user: user,
      posts: posts,
      // userId: session?.id,
    },
  };
}
