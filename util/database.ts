import camelCaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// CONNECT TO POSTGRESQL
const sql = postgres();

// export async function readUsers() {
//   const users = await sql`
// SELECT * FROM users
// `;
//   return users;
// }

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

type Session = {
  id: number;
  token: string;
  userId: number;
};

export type Profile = {
  id: number;
  userId: number;
  bio: string;
};

export type Post = {
  id: number;
  userId: number;
  image: string;
  title: string;
  description: string;
  needleSize: string;
  yarnName: string;
};

// CREATE USER

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

// READ USER BY ID

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

// READ USER BY USERNAME

export async function getUserByUsername(username: string) {
  const [user] = await sql<[id: number | undefined]>`
   SELECT
     id
   FROM
     users
   WHERE
     username =${username}`;
  return user && camelCaseKeys(user);
}

// READ USER WITH PASSWORD HASH

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

// CREATE A SESSION

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`

  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING
  id, token`;

  await deleteExpiredSessions();
  return camelCaseKeys(session);
}

// READ USER BY VALID SESSION TOKEN

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
      -- ADD TABLE COMMENTS
      -- ,comments
      --, likes
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelCaseKeys(user);
}

// READ A VALID SESSION TOKEN

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelCaseKeys(session);
}

// DELETE THE SESSION

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return session && camelCaseKeys(session);
}

// DELETE THE EXPIRED SESSION

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < NOW()
    RETURNING *`;

  return sessions.map((session) => camelCaseKeys(session));
}

// CREATE PROFILE BIO

export async function createProfileBio(userId: number, bio: string) {
  const [profile] = await sql<[Profile]>`

  INSERT INTO profile
  (bio, user_id)
  VALUES
  (${bio}, ${userId})
  RETURNING
  bio, id`;

  return camelCaseKeys(profile);
}

// CREATE POST

export async function createPost(
  image: string,
  title: string,
  description: string,
  needleSize: string,
  yarnName: string,
) {
  const [post] = await sql<[Post]>`
  INSERT INTO posts
  (image, title, description, needle_size, yarn_name)
  VALUES
  (${image},${title}, ${description}, ${needleSize}, ${yarnName})
  RETURNING
  image, title, description, yarn_name, needle_size`;

  return camelCaseKeys(post);
}

// GET ALL POSTS

export async function getPosts() {
  const posts = await sql<Post[]>`
  SELECT * FROM posts;`;
  return posts.map((post) => camelCaseKeys(post));
}

// GET SINGLE POST

export async function getPostById(id: number) {
  const [post] = await sql<[Post]>`
  SELECT
   id, image, title, description, needle_size, yarn_name
   FROM
   posts
   WHERE
   id = ${id}`;
  return camelCaseKeys(post);
}

// DELETE POST
