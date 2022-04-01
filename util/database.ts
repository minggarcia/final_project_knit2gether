import camelCaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// export async function readUsers() {
//   const users = await sql`
// SELECT * FROM users
// `;
//   return users;
// }

export type User = {
  id: number;
  username: string;
  image: string;
  bio: string;
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
  image: string;
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
  username: string;
};

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  username: string;
  image: string;
};

// CREATE USER

export async function createUser(
  username: string,
  passwordHash: string,
  image: string,
  bio: string,
) {
  const [user] = await sql<[User]>`

  INSERT INTO users
  (username, password_hash, image, bio)
  VALUES
  (${username}, ${passwordHash}, ${image}, ${bio})
  RETURNING
  id,
  username,
  image,
  bio`;
  return camelCaseKeys(user);
}

// READ USER BY ID

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
  SELECT
   id, username, image, bio
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
      users.username,
      users.image,
      users.bio
    FROM
      users,
      sessions
      --,
      --posts
     -- comments,
      -- likes

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

// DELETE THE EXPIRED SESSIONS

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < NOW()
    RETURNING *`;

  return sessions.map((session) => camelCaseKeys(session));
}

// CREATE POST

export async function createPost(
  userId: number,
  image: string,
  title: string,
  description: string,
  needleSize: string,
  yarnName: string,
  username: string,
) {
  const [post] = await sql<[Post]>`
  INSERT INTO posts
  (user_id, image, title, description, needle_size, yarn_name, username)
  VALUES
  (${userId}, ${image},${title}, ${description}, ${needleSize}, ${yarnName}, ${username})
  RETURNING
  user_id, image, title, description, yarn_name, needle_size, username`;

  return camelCaseKeys(post);
}

// GET ALL POSTS

export async function getPosts() {
  const posts = await sql<Post[]>`
  SELECT * FROM posts;`;

  return posts.map((post) => camelCaseKeys(post));
}

// GET SINGLE POST BY POST ID

export async function getPostById(id: number) {
  const [post] = await sql<[Post]>`
  SELECT
   id, image, title, description, needle_size, yarn_name, user_id, username
   FROM
   posts
   WHERE
   id = ${id}`;

  return camelCaseKeys(post);
}

// GET POST BY USER ID

export async function getPostsByUserId(userId: number) {
  const posts = await sql<[Post]>`
  SELECT
  *
  FROM
  posts
  WHERE
    user_id = ${userId}`;
  return posts.map((post) => {
    return camelCaseKeys(post);
  });
}

// UPDATE POST

export async function updatePostById(
  id: number,
  image: string,
  title: string,
  description: string,
  needleSize: string,
  yarnName: string,
) {
  const [post] = await sql<[Post | undefined]>`
    UPDATE
      posts
    SET
      image = ${image},
      title = ${title},
      description= ${description},
      needle_size = ${needleSize},
      yarn_name = ${yarnName}
      WHERE
      id = ${id}
      RETURNING
      *`;
  return post && camelCaseKeys(post);
}

// DELETE POST

export async function deletePostByPostId(id: number) {
  const [post] = await sql<[Post | undefined]>`
  DELETE FROM
  posts
  WHERE
  id = ${id}
  RETURNING *
  `;
  return post && camelCaseKeys(post);
}

// CREATE COMMENTS

export async function createComment(
  userId: number,
  postId: number,
  comment: string,
  username: string,
  image: string,
) {
  const [commentId] = await sql<[Comment]>`
INSERT INTO COMMENTS
(user_id, post_id, comment, username, image)
VALUES
(${userId}, ${postId}, ${comment}, ${username}, ${image})
RETURNING
user_id, post_id, comment, username, image
`;
  return camelCaseKeys(commentId);
}

// READ COMMENTS BY ID

export async function getCommentsByPostId(id: number) {
  const comments = await sql<[Comment]>`
  SELECT
*
  FROM
  comments
  WHERE
 post_id = ${id}`;

  return comments.map((comment) => camelCaseKeys(comment));
}

// DELETE COMMENTS

export async function deleteCommentById(id: number) {
  const [deletedComment] = await sql<[Comment]>`
  DELETE FROM
  comments
  WHERE
  id = ${id}
  RETURNING
  *`;
  return camelCaseKeys(deletedComment);
}
