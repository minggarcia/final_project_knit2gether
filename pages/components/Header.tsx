import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../../util/database';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
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
  justify-content: right;
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
type Props = {
  userObject?: User;
};
export default function Header(props: Props) {
  return (
    <header>
      <div css={headerStyle}>
        {/* <Link href="/">
          <a>Logo</a>
        </Link> */}
        <Link href="/">
          <a>knit2gether</a>
        </Link>
        {props.userObject && <div>hi bestie, {props.userObject.username}</div>}{' '}
      </div>

      <div css={underHeaderContent}>
        <div>
          {props.userObject ? (
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <a>Register</a>
              </Link>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
