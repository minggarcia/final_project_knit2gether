import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// CONNECT TO POSTGRESQL
const sql = postgres();

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

export async function createUser(username, passwordHash) {
  await sql`
  INSERT INTO users
  (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id,
  username`;
  return camelcaseKeys(user);
}
