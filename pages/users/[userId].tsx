import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getUserById, User } from '../../util/database';
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

type Props = {
  user?: User;
  userObject: { username: string };
};

export default function UserProfile(props: Props) {
  const [bio, setBio] = useState('');

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
            <div>member since</div>
          </div>
        </div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('api/profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bio: bio,
              }),
            });
            const responseBody = await response.json();
            console.log(responseBody);
            return;
          }}
        >
          <div css={bioStyle}>
            bio description
            <input
              value={bio}
              onChange={(event) => setBio(event.currentTarget.value)}
            />
          </div>
        </form>
        <div>
          <Link href="/upload">
            <a>
              <button>+</button>
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  const userId = context.query.userId;

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

  return {
    props: {
      user: user,
    },
  };
}
