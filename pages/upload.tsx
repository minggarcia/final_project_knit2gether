import { image } from '@cloudinary/url-gen/qualifiers/source';
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
  cloudinaryAPI: string;
};

export default function Upload(props: Props) {
  // const [selectedImage, setSelectedImage] = useState();
  // const [fileInputState, setFileInputState] = useState('');
  // const [previewSource, setPreviewSource] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [needleSize, setNeedleSize] = useState('');
  const [yarnName, setYarnName] = useState('');
  const router = useRouter();

  // const handleOnChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  // };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // ON CHANGE HANDLER TRIGGERS WHEN FILE INPUT CHANGES

  // function handleOnChange(changeEvent) {
  //   const reader = new FileReader();

  //   reader.onload = function (onLoadEvent) {
  //     setImageSource(onLoadEvent.target.result);
  //     setUploadData(undefined);
  //   };

  //   reader.readAsDataURL(changeEvent.target.files[0]);
  // }

  // // ON SUBMIT WHEN FORM IS SUBMITTED

  // async function handleOnSubmit(event) {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const fileInput = Array.from(form.elements).find(
  //     ({ name }) => name === 'file',
  //   );
  //   console.log(fileInput);

  //   const formData = new FormData();
  //   for (const file of fileInput.files) {
  //     formData.append('file', file);
  //   }

  //   formData.append('upload_preset', 'uploads');

  //   const data = await fetch(
  //     'https://api.cloudinary.com/v1_1/knit2gether/image/upload',
  //     {
  //       method: 'POST',
  //       body: formData,
  //     },
  //   ).then((response) => response.json());

  //   setImageSource(data.secure_url);
  //   setUploadData(data);

  //   console.log(data);
  // }

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
                  image: image,
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
              <input type="file" onChange={uploadImage} />

              <div>
                {loading ? (
                  <p>Loading ...</p>
                ) : (
                  <img
                    src={imageSource}
                    alt="preview"
                    style={{ height: '200px' }}
                  />
                )}
              </div>
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

export function getServerSideProps() {
  const cloudinaryAPI = process.env.CLOUDINARY_NAME;

  return {
    props: {
      cloudinaryAPI,
    },
  };
}
