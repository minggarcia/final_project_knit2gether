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
};

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  content: string;
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

// CREATE PROFILE BIO

export async function createProfileImageAndBio(
  userId: number,
  image: string,
  bio: string,
) {
  const [profile] = await sql<[Profile]>`

  INSERT INTO profile
  (image, bio, user_id)
  VALUES
  (${image}, ${bio}, ${userId})
  RETURNING
  image, bio, id`;

  return camelCaseKeys(profile);
}

// READ bio and image of profile

export async function getProfileImageAndBioById(id: number) {
  const [profile] = await sql<[Profile]>`
  SELECT
  id, image, bio
   FROM
   profile
   WHERE
   id = ${id}`;

  return camelCaseKeys(profile);
}

// CREATE POST

export async function createPost(
  userId: number,
  image: string,
  title: string,
  description: string,
  needleSize: string,
  yarnName: string,
) {
  const [post] = await sql<[Post]>`
  INSERT INTO posts
  (user_id, image, title, description, needle_size, yarn_name)
  VALUES
  (${userId}, ${image},${title}, ${description}, ${needleSize}, ${yarnName})
  RETURNING
  user_id, image, title, description, yarn_name, needle_size`;

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
   id, image, title, description, needle_size, yarn_name
   FROM
   posts
   WHERE
   id = ${id}`;

  return camelCaseKeys(post);
}

// GET POST BY USER ID

export async function getPostsByUserId(userId: number) {
  if (!userId) return undefined;
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
  content: string,
  username: string,
) {
  const [comment] = await sql<[Comment]>`
INSERT INTO COMMENTS
(user_id, post_id, content, username)
VALUES
(${userId}, ${postId}, ${content}, ${username})
RETURNING
user_id, post_id, content, username
`;
  return camelCaseKeys(comment);
}

// READ COMMENTS BY ID

export async function getCommentsByPostId(id: number) {
  const [comment] = await sql<[Comment]>`
  SELECT
  id, content
  FROM
  comments
  WHERE
 post_id = ${id}`;

  return camelCaseKeys(comment);
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
