import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from './components/Layout';

const h1Style = css`
  margin-top: 30px;
  justify-content: center;
  display: flex;
  color: #d7839b;
  gap: 40px;
`;

const inputFieldSectionStyles = css`
  display: block;
  position: right;
  margin-top: 120px;
`;

const inputFieldStyle = css`
  background: #e4deca;
  border-radius: 5px;
  line-height: 40px;
  margin-top: 30px;
  width: 240px;
  border: transparent;
`;

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
};

export default function Upload(props: Props) {
  const [selectedImage, setSelectedImage] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [yarnName, setYarnName] = useState('');
  const router = useRouter();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
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
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: title,
                  description: description,
                  needleSize: needleSize,
                  yarnName: yarnName,
                }),
              });
              props.refreshUserProfile();
              await router.push(`/`);
            }}
          >
            <div css={inputFieldSectionStyles}>
              <div>Upload knit</div>
              <input type="file" onChange={handleOnChange} />
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
                  onChange={(event) => setNeedleSize(event.currentTarget.value)}
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
                <button>Upload</button>
              </div>
            </div>
          </form>

          {previewSource && (
            <img
              src={previewSource}
              alt="preview"
              style={{ height: '200px' }}
            />
          )}
        </div>
      </Layout>
    </div>
  );
}
