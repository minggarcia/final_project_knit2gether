import camelCaseKeys from 'camelcase-keys';
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

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
  SELECT
   id, username
   FROM
   users
   WHERE
   id = ${id}`;
  return user && camelCaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[id: number | undefined]>`
  SELECT id FROM users WHERE username =${username}`;
  return user && camelCaseKeys(user);
}
export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
   id, username, password_hash
   FROM
   users
   WHERE
   username =${username}`;
  return user && camelCaseKeys(user);
}

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
