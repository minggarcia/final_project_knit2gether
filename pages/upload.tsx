import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Layout from './components/Layout';

const inputFieldStyles = css`
  align-items: right;
  display: flex;
  flex-direction: columns;
`;

type Props = {
  userObject: { username: string };
};

export default function Upload(props: Props) {
  const [imageSource, setImageSource] = useState();
  const [uploadData, setUploadData] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [yarnName, setYarnName] = useState('');

  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>Home</title>

          <meta name="Homepage" content="Homepage" />
        </Head>

        <div>
          <h1>Upload you project</h1>
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div css={inputFieldStyles}>
              <input
                placeholder="add title"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
              <input
                placeholder="add description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
              <input
                placeholder="needle size"
                value={needleSize}
                onChange={(event) => setNeedleSize(event.currentTarget.value)}
              />
              <input
                placeholder="add yarn name"
                value={yarnName}
                onChange={(event) => setYarnName(event.currentTarget.value)}
              />
              <button>Upload</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
