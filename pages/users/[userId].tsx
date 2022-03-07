import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { getUserById, getValidSessionByToken, User } from '../../util/database';
import Layout from '../components/Layout';

type Props = {
  user?: User;
};
export default function UserProfile(props: Props) {
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
      <Layout>
        <Head>
          <title>Profile</title>

          <meta
            name="Profile"
            content={`Profile Page of ${props.user.username}`}
          />
        </Head>
        <div>
          <h1>Hi bestie {props.user.username}!</h1>
        </div>
        <div>
          <p>This should be the profile page</p>
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
