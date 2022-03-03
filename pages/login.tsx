import Head from 'next/head';
import Layout from './components/Layout';

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name="Login" content="Log in into knit2gether" />
      </Head>
      <h1>Log In</h1>
    </Layout>
  );
}
