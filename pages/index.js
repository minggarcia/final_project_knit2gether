import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Home</title>

          <meta name="Homepage" content="Homepage" />
        </Head>
        <div css={homepageStyle}>
          <div css={imageSection}>
            <Image
              css={imageStyle}
              alt="people making a knit project"
              src="/Knit_and_Crochet_Meetup.jpg"
              width="890"
              height="456"
            />
          </div>
          <div css={newKnitsSection}>
            <h2>newest knitties from the community</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
}
