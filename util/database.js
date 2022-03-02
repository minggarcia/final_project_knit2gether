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
