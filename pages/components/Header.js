import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
`;

export default function Header() {
  return (
    <header css={headerStyle}>
      <div>
        <Link href="/">
          <a>Logo</a>
        </Link>
      </div>
      <div>
        <p>knit2gether</p>
      </div>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </header>
  );
}
