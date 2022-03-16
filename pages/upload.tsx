// import { Cloudinary } from '@cloudinary/url-gen';
// import { fill } from '@cloudinary/url-gen/actions/resize';
import { css } from '@emotion/react';
// import cloudinary from 'cloudinary';
import Head from 'next/head';
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
// // set cloud name:
// const cld = new Cloudinary({
//   cloud: {
//     cloudName: 'knit2gether',
//   },
// });

// // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
// const myImage = cld.image('docs/models');

// // Resize to 250 x 250 pixels using the 'fill' crop mode.
// myImage.resize(fill().width(250).height(250));

// // Render the image in an 'img' element.
// const imgElement = document.createElement('img');
// document.body.appendChild(imgElement);
// imgElement.src = myImage.toURL();

type Props = {
  userObject: { username: string };
};

export default function Upload(props: Props) {
  // const [imageSource, setImageSource] = useState();
  // const [uploadData, setUploadData] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [yarnName, setYarnName] = useState('');

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
          <form onSubmit={(e) => e.preventDefault()}>
            <div css={inputFieldSectionStyles}>
              <div>Upload knit</div>
              <input type="file" />
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
        </div>
      </Layout>
    </div>
  );
}

// export async function getServerSideProps() {
//   const cloudinary = await import('cloudinary');
//   return;
// }
