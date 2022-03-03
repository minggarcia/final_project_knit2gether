import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  color: #d7839b;
  a {
    color: #d7839b;
    text-decoration: none;
  }
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
        <Link href="/">
          <a>knit2gether</a>
        </Link>
      </div>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </header>
  );
}
