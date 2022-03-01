import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            box-sizing: border-box;
          }
          main {
            margin: 0 10px;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
