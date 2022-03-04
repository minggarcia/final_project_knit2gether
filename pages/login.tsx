import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { images } from '../next.config';

const loginLayout = css`
  display: flex;
  justify-content: center;
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
const loginStyle = css`
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

const nextButton = css`
  background: #d7839b;
  width: 100px;
  height: 60px;
  border-radius: 38px;
  margin-top: 50px;
  font-size: 18px;
  border: transparent;
  align-self: right;
  cursor: button;
  margin-left: 130px;
`;

const joinButton = css`
  color: white;
  background: #779677;
  text-align: center;
  width: 200px;
  height: 75px;
  border-radius: 38px;
  margin-top: 50px;
  font-size: 18px;
  border: transparent;
  cursor: pointer;
`;

const joinSectionStyle = css`
  margin-top: 80px;
  gap: 20px;
  display: block;
`;

const spanStyle = css`
  color: #d7839b;
  font-size: 18px;
  justify-content: center;
  margin-top: 30px;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div css={loginLayout}>
      <Head>
        <title>Login</title>
        <meta name="Login" content="Log in into knit2gether" />
      </Head>
      <div css={imageStyleSection}>
        <span>knit2gether</span>
        <div css={imageStyle}>
          <Image
            css={imageStyle}
            alt="group of models posing with knitwear"
            src="/group.jpg"
            width="564"
            height="650"
          />
        </div>
      </div>

      <div css={loginStyle}>
        <h1 css={h1Style}>Log In</h1>
        <div css={formStyle}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          />
          <div>
            <input
              css={inputFieldStyle}
              placeholder="enter your username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>
          <div>
            <input
              css={inputFieldStyle}
              placeholder="enter your password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <div>
            <button css={nextButton}>
              <Image
                alt="arrow pointing to right"
                src="/arrow.png"
                width="40"
                height="20"
              />
            </button>
          </div>
          <div css={joinSectionStyle}>
            <button css={joinButton}>join the party</button>
          </div>
          <span css={spanStyle}>show off your knits and register now!</span>
        </div>
      </div>
    </div>
  );
}
