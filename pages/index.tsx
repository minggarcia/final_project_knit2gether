import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getUserByValidSessionToken } from '../util/database';
import Layout from './components/Layout';

const homepageStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const imageStyle = css`
  border-radius: 50px;
`;

const imageSection = css`
  margin-top: 30px;
  justify-content: center;
  display: flex;
`;

const newKnitsSection = css`
  margin-top: 60px;
  text-align: center;

  h2 {
    color: #779677;
  }
`;
type Props = {
  userObject: { username: string };
};

export default function Home(props: Props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Home</title>

          <meta name="Homepage" content="Homepage" />
        </Head>
        <div css={homepageStyle}>
          <div css={imageSection}>
            {/* <Image
              css={imageStyle}
              alt="people making a knit project"
              src="/Knit_and_Crochet_Meetup.jpg"
              width="900"
              height="456"
            /> */}
          </div>
          <div css={newKnitsSection}>
            <h2>newest knitties from the community</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return that and render page
  if (user) {
    return {
      props: { user: user },
    };
  }

  // 3. Otherwise redirect to login
  return {
    redirect: {
      destination: `/login?returnTo=/`,
      permanent: false,
    },
  };
}
