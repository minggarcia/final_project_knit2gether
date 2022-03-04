import camelCaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// CONNECT TO POSTGRESQL
const sql = postgres();

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function readUsers() {
  const users = await sql`
SELECT * FROM users
`;
  return users;
}

// export async function getSinglePost(id) {
//   const users = await sql`
//   SELECT * FROM users WHEaRE id=${id}
//   `;
//   return camelCaseKeys(users);
// }

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`

  INSERT INTO users
  (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id,
  username`;
  return camelCaseKeys(user);
}
