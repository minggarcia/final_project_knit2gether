import Head from 'next/head';
import Layout from '../components/Layout';

export default function UserProfile() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Profile</title>

          <meta name="Profile" content="Profile Page" />
        </Head>
        <div>
          <h1>Profile</h1>
        </div>
        <div>
          <p>This should be the profile page</p>
        </div>
      </Layout>
    </div>
  );
}
