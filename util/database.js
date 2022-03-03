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

export async function getSinglePost(id) {
  const users = await sql`
  SELECT * FROM users WHERE id=${id}
  `;
  return camelCaseKeys(users);
}
