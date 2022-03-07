import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
  color: #d7839b;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  a {
    color: #d7839b;
    text-decoration: none;
  }
`;

// const dropdownButton = css`
//   background: #e4deca;
//   color: white;
//   border-radius: 50%;
//   height: 50px;
//   width: 50px;
//   font-size: 20px;
//   font-weight: bold;
//   cursor: pointer;
// `;

// const dropdownStyle = css`
//   position: relative;
//   display: inline-block;
//   :hover {
//     display: block;
//   }
//   a:hover {
//     background: #f1f1f1;
//   }
// `;

// const dropdownContent = css`
//   display: none;
//   position: absolute;
//   right: 0;
//   background: #f9f9f9;
//   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//   min-width: 170px;
//   z-index: 1;
//   a {
//     color: #779677;
//     display: block;
//     font-weight: normal;
//     font-size: 18px;
//   }
//   a :hover {
//     background-color: #e4deca;
//   }
//   display: block;
// `;

const underHeaderContent = css`
  justify-content: center;
  display: flex;
  gap: 80px;
  align-items: center;

  a {
    color: #779677;
    text-decoration: none;
    text-align: center;
    padding: 20px;
  }
  border-bottom: solid 3px #e4deca;
  margin: 10px;
`;

export default function Header(props) {
  return (
    <header>
      <div css={headerStyle}>
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
        <div>
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </div>
      </div>

      <div css={underHeaderContent}>
        <div>{props.userObject && <div>{props.userObject.username}</div>} </div>
        <Link href="/">
          <a>P</a>
        </Link>
        <div>
          <Link href="/register">
            <a>Register</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </header>
  );
}
