import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UploadResponseBody } from './api/upload';
import Layout from './components/Layout';

const h1Style = css`
  margin-top: 30px;
  justify-content: center;
  display: flex;
  color: #d7839b;
  gap: 40px;
`;

const uploadLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const layoutForm = css`
  display: flex;
  form {
    display: flex;
  }
`;

const uploadStyle = css`
  background: #e4deca;
  border-radius: 66px;
  height: 750px;
  padding: 50px;
  margin-top: 50px;
  box-shadow: 5px 10px 20px #957666;
  display: block;
  width: 30vw;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const uploadInfoStyle = css`
  display: flex;
  flex-direction: column;
  margin: 50px 50px;
  border: solid 10px #957666;
  border-radius: 66px;
  width: 543px;
  height: 600px;
`;

const inputFieldStyle = css`
  background: #e4deca;
  border-radius: 5px;
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
`;

const buttonStyle = css`
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

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  cloudinaryAPI: string;
};

export default function Upload(props: Props) {
  const [imageSource, setImageSource] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [yarnName, setYarnName] = useState('');

  const router = useRouter();

  const uploadImage = async (event: any) => {
    const files = event.currentTarget.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'uploads');
    setLoading(true);

    const response = await fetch(
      `	https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const file = await response.json();

    setImageSource(file.secure_url);
    setLoading(false);
  };

  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Upload</title>

          <meta name="Homepage" content="Homepage" />
        </Head>

        <div>
          <h1 css={h1Style}>Upload you project</h1>
        </div>

        <div css={uploadLayout}>
          <div css={layoutForm}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const uploadResponse = await fetch('/api/upload', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    image: imageSource,
                    title: title,
                    description: description,
                    needleSize: needleSize,
                    yarnName: yarnName,
                  }),
                });

                const uploadResponseBody =
                  (await uploadResponse.json()) as UploadResponseBody;

                console.log('uploadResponseBody', uploadResponseBody);

                props.refreshUserProfile();
                await router.push('/');
              }}
            >
              <div css={uploadStyle}>
                <input type="file" onChange={uploadImage} />

                <div>
                  {loading ? (
                    <div>
                      <img src="/loading.gif" alt="loading" />
                    </div>
                  ) : (
                    <img
                      src={imageSource}
                      alt="preview"
                      style={{ height: '700px', width: '700px' }}
                    />
                  )}
                </div>
              </div>

              <div css={uploadInfoStyle}>
                <div>
                  <input
                    css={inputFieldStyle}
                    placeholder="add title"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                  />
                </div>
                <div>
                  <input
                    css={inputFieldStyle}
                    placeholder="add description"
                    value={description}
                    onChange={(event) =>
                      setDescription(event.currentTarget.value)
                    }
                  />
                </div>
                <div>
                  <input
                    css={inputFieldStyle}
                    placeholder="needle size"
                    value={needleSize}
                    onChange={(event) =>
                      setNeedleSize(event.currentTarget.value)
                    }
                  />
                </div>
                <div>
                  <input
                    css={inputFieldStyle}
                    placeholder="add yarn name"
                    value={yarnName}
                    onChange={(event) => setYarnName(event.currentTarget.value)}
                  />
                </div>
                <div>
                  <button css={buttonStyle}>Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export function getServerSideProps() {
  const cloudinaryAPI = process.env.CLOUDINARY_NAME;

  return {
    props: {
      cloudinaryAPI,
    },
  };
}
