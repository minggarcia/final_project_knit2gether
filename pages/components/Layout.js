import Head from 'next/head';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo-pink.png" />
      </Head>
      <Header userObject={props.userObject} />
      <main>{props.children}</main>
      <footer />
    </>
  );
}
