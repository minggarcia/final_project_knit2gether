import Head from 'next/head';
import Image from 'next/image';
import Layout from './components/Layout';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Home</title>

          <meta name="Homepage" content="Homepage" />
        </Head>
        <h1>Welcome to knit2gether!</h1>
        <Image
          alt="people making a knit project"
          src="/Knit_and_Crochet_Meetup.jpg"
          width="500"
          height="300"
        />
        <h2>newest knitties from the community</h2>
      </Layout>
    </div>
  );
}
