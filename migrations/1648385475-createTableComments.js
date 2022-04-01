exports.up = async (sql) => {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      post_id integer REFERENCES posts (id) ON DELETE CASCADE,
      comment varchar(100),
      username varchar(30) REFERENCES users(username) ON DELETE CASCADE,
      image varchar (200) REFERENCES users(image) ON DELETE CASCADE
    );
  `;
};

exports.down = async (sql) => {
  console.log('dropping comments');
  await sql`
    DROP TABLE comments
  `;
};
