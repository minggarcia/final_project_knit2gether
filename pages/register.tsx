import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from './components/Layout';

const registrationLayout = css`
  display: flex;
  justify-content: center;
`;
const registrationStyle = css`
  border: solid 10px #957666;
  border-radius: 66px;
  width: 543px;
  height: 650px;
  margin: 30px 50px;
  padding: 50px;
`;

const h1Style = css`
  color: #779677;
  font-weight: normal;
`;

const formStyle = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const inputFieldStyle = css`
  background: #e4deca;
  border-radius: 5px;
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
`;

const createAccountButton = css`
  color: white;
  background: #d7839b;
  text-align: center;
  width: 240px;
  height: 75px;
  border-radius: 38px;
  margin-top: 50px;
  font-size: 18px;
  font-family: 'Syne', sans-serif;
  border: transparent;
`;

const imageStyleSection = css`
  display: block;
  margin-top: 50px;
  text-align: center;

  span {
    color: #d7839b;
    font-weight: 800;
    font-size: 50px;
  }
`;

const imageStyle = css`
  margin-top: 30px;
  border-radius: 20px;
`;

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div css={registrationLayout}>
      <Head>
        <title>Registration</title>
        <meta name="Registration" content="Register to knit2gether" />
      </Head>
      <div css={registrationStyle}>
        <h1 css={h1Style}>Registration</h1>
        <div css={formStyle}>
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
            <div>
              <input
                css={inputFieldStyle}
                placeholder="enter username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>
            <div>
              {' '}
              <input
                css={inputFieldStyle}
                placeholder="enter password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
            <div>
              <button css={createAccountButton}>Create Account</button>
            </div>
          </form>
        </div>
      </div>

      <div css={imageStyleSection}>
        <span>knit2gether</span>
        <div css={imageStyle}>
          <Image
            css={imageStyle}
            alt="models posing with knitwear"
            src="/green.jpg"
            width="564"
            height="646"
          />
        </div>
      </div>
    </div>
  );
}
