import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../../util/database';

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px;
  color: #d7839b;
  font-size: 20px;
  font-weight: bold;
  border: solid 4px #779677;
  border-radius: 20px;
  padding: 20px 10px;
  box-shadow: 5px 10px 20px #779677;

  cursor: pointer;
  a {
    color: #d7839b;
    text-decoration: none;
  }
`;

const underHeaderContent = css`
  justify-content: right;
  display: flex;

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
        <Link href="/">
          <a>knit2gether</a>
        </Link>
        {props.userObject && <div>hi bestie, {props.userObject.username}</div>}{' '}
      </div>

      <div>
        <div css={underHeaderContent}>
          {/* <Link href=`/users/${user.id}`>
            <a>Profile</a>
          </Link> */}
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
