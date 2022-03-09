import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { LoginResponseBody } from './api/login';

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
  box-shadow: 5px 10px 20px #957666;
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

  input:focus {
    border: 2px solid #779677;
  }
`;
const inputFieldStyle = css`
  background: #e4deca;
  border-radius: 5px;
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
  :focus {
    border: #779677 solid 2px;
  }
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
  cursor: pointer;
  margin-left: 130px;
`;

const joinButton = css`
  color: white;
  font-family: 'Syne', sans-serif;
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
  margin-top: 120px;
  display: flex;
  gap: 20px;
  p {
    color: #d7839b;
    margin-top: 80px;
  }
`;

const errorStyles = css`
  color: red;
  display: flex;
  justify-content: center;
`;

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  csrfToken: string;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

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
        <h1 css={h1Style}>Log In</h1>{' '}
        <div css={formStyle}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              const loginResponseBody =
                (await loginResponse.json()) as LoginResponseBody;

              if ('errors' in loginResponseBody) {
                setErrors(loginResponseBody.errors);
                return;
              }

              const returnTo = router.query.returnTo;

              if (
                returnTo &&
                !Array.isArray(returnTo) &&
                // match returnTo with valid path
                /^\/[a-zA-Z0_9-?=]*$/.test(returnTo)
              ) {
                props.refreshUserProfile();
                await router.push(returnTo);
                return;
              }

              // when login worked it redirects to profile page
              // (clears errors) // setErrors([]);
              props.refreshUserProfile();
              await router.push(`/users/${loginResponseBody.user.id}`);
            }}
          >
            <div css={errorStyles}>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>
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
                  src="/right-arrow.png"
                  width="50"
                  height="40"
                />
              </button>
            </div>
          </form>
          <div css={joinSectionStyle}>
            <Link href="/register">
              <a>
                <button css={joinButton}>join the party</button>
              </a>
            </Link>

            <p>show off your knits and register now!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  // 1. check if there is a token and if it is valid from the cookie
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if the token is valid and redirect
    const session = await getValidSessionByToken(token);

    if (session) {
      console.log(session);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. Otherwise, generate CSRF token and render the page

  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
