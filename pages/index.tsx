import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getUserByValidSessionToken, Post } from '../util/database';
import Layout from './components/Layout';

const homepageStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const imageStyle = css`
  border-radius: 50px;
  justify-content: center;
`;

const h1Style = css`
  margin-top: 30px;
  justify-content: center;
  display: flex;
  color: #d7839b;
  gap: 40px;
`;

const imageSectionStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const newKnitsSection = css`
  margin-top: 60px;
  text-align: center;

  h2 {
    color: #779677;
  }
`;

const allPostsStyle = css`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  Image {
    display: flex;
    flex-direction: row;
  }
  p {
    text-decoration: none;
  }
`;
type Props = {
  userObject: { username: string };
  posts: Post[];
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
          <div css={h1Style}>
            <h1>Welcome to knit2gether</h1>
            <Image src="/logo-pink.png" width="80px" height="30px" />
          </div>

          <div css={imageSectionStyle}>
            <Image
              css={imageStyle}
              alt="knitting material laid out on a pink surface"
              src="/knit banner.jpeg"
              width="1286"
              height="340"
            />
          </div>
          <div css={newKnitsSection}>
            <h2>newest knitties from the community</h2>
          </div>
          {props.posts.map((post) => {
            return (
              <div key={`post-${post.id}`} css={allPostsStyle}>
                <Link href={`/posts/${post.id}`}>
                  <a>
                    <Image
                      alt="uploaded post"
                      src={post.image}
                      width="400px"
                      height="400px"
                    />
                    <p>{post.title}</p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const posts = await getPosts();
  console.log('database', posts);

  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return that and render page
  if (user) {
    return {
      props: {
        user: user,
        posts: posts,
      },
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
