import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { RegisterResponseBody } from './api/register';

const registrationLayout = css`
  display: flex;
  justify-content: center;
`;
const registrationStyle = css`
  border: solid 10px #957666;
  border-radius: 66px;
  width: 543px;
  height: 800px;
  margin: 10px 50px;
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
  margin-top: 40px;
  textarea {
    background: #e4deca;
    border-radius: 5px;
    margin-top: 30px;
    width: 240px;
    border: transparent;
    font-family: Syne;
    font-size: 14px;
  }
  img {
    border-radius: 50%;
  }
`;

const inputFieldStyle = css`
  background: #e4deca;
  border-radius: 5px;
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
  font-family: Syne;
`;

const uploadStyle = css`
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
  font-family: Syne;

  ::-webkit-file-upload-button {
    background: #d7839b;
    color: white;
    font-family: Syne;
    font-size: 14px;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    border: transparent;
  }
`;

const profilePicStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 60px;
`;

const createAccountButton = css`
  color: white;
  background: #d7839b;
  text-align: center;
  width: 240px;
  height: 75px;
  border-radius: 38px;
  margin-top: 30px;
  font-size: 18px;
  font-family: 'Syne', sans-serif;
  border: transparent;
  cursor: pointer;
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
const errorStyles = css`
  margin-top: 20px;
  color: red;
`;

const loginSectionStyle = css`
  display: flex;
  margin-top: 50px;
  gap: 20px;
  p {
    color: #d7839b;
    margin-top: 80px;
  }
`;

const loginButton = css`
  color: white;
  background: #779677;
  text-align: center;
  width: 150px;
  height: 75px;
  border-radius: 38px;
  margin-top: 50px;
  font-size: 18px;
  font-family: 'Syne', sans-serif;
  border: transparent;
  cursor: pointer;
`;

type Errors = { message: string }[];
type Props = {
  refreshUserProfile: () => void;
  csrfToken: string;
  cloudinaryAPI: string;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('/profilepic.png');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  const uploadImage = async (event: any) => {
    const files = event.currentTarget.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'uploads');
    // setLoading(true);

    const response = await fetch(
      `	https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const file = await response.json();

    setProfilePic(file.secure_url);
    // setLoading(false);
  };

  return (
    <div css={registrationLayout}>
      <Head>
        <title>Registration</title>
        <meta name="Registration" content="Register to knit2gether" />
        <link rel="icon" href="/logo-pink.png" />
      </Head>
      <div css={registrationStyle}>
        <h1 css={h1Style}>Registration</h1>
        <div css={formStyle}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  image: profilePic,
                  bio: bio,
                  csrfToken: props.csrfToken,
                }),
              });
              const registerResponseBody =
                (await registerResponse.json()) as RegisterResponseBody;

              console.log('REGISTER RESPONSE BODY', registerResponseBody);
              if ('errors' in registerResponseBody) {
                setErrors(registerResponseBody.errors);
                return;
              }
              props.refreshUserProfile();
              await router.push('/');
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
              <input css={uploadStyle} type="file" onChange={uploadImage} />
            </div>
            <div>
              <img
                css={profilePicStyle}
                src={profilePic}
                alt="user profile pic"
                style={{ height: '100px', width: '100px' }}
              />
            </div>
            <div>
              <textarea
                value={bio}
                placeholder="add a bio to your profile"
                onChange={(event) => setBio(event.currentTarget.value)}
              />
            </div>

            <div css={errorStyles}>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>
            <div>
              <button css={createAccountButton}>Create Account</button>
            </div>
          </form>
          <div css={loginSectionStyle}>
            <Link href="/login">
              <a>
                <button css={loginButton}>Log In</button>
              </a>
            </Link>

            <p>Already have an account?</p>
          </div>
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
            height="790"
          />
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
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // 1. check if there is a token and is valid from the cookie
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if the token its valid and redirect
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
  const cloudinaryAPI = process.env.CLOUDINARY_NAME;
  // 3. Otherwise, generate CSRF token and render the page
  return {
    props: {
      csrfToken: createCsrfToken(),
      cloudinaryAPI,
    },
  };
}
