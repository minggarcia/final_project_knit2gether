import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getUserById, getValidSessionByToken, User } from '../../util/database';
import Layout from '../components/Layout';

type Props = {
  user?: User;
  userObject: { username: string };
};
export default function UserProfile(props: Props) {
  console.log(error);
  if (!props.user) {
    return (
      <Layout>
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
            name="Profile"
            content={`Profile Page of ${props.user.username}`}
          />
        </Head>
        <div>
          <h1>Welcome {props.user.username}!</h1>
        </div>
        <div>
          <p>This should be the profile page</p>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);

  // User id is not correct type
  if (!session) {
    return {
      props: {
        error: 'Oops something went wrong',
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
