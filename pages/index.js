import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from './components/Layout';

// const homepageStyle = css`
//   display: block;
//   justify-content: center;
// `;

const imageStyle = css`
  border-radius: 50px;
  margin-top: 40px;
`;

const newKnitsSection = css`
  text-align: center;
  h2 {
    color: 779677;
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
        <div>
          <div>
            <Image
              css={imageStyle}
              alt="people making a knit project"
              src="/Knit_and_Crochet_Meetup.jpg"
              width="1252"
              height="351"
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
