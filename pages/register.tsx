import Head from 'next/head';
import { useState } from 'react';
import Layout from './components/Layout';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Layout>
      <Head>
        <title>Register</title>
        <meta name="Registration" content="Register to knit2gether" />
      </Head>
      <h1>Registration</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
        }}
      >
        <input
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <button>Create Account</button>
      </form>
    </Layout>
  );
}
