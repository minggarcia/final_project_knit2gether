exports.up = async (sql) => {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			user_id integer REFERENCES users (id) ON DELETE CASCADE,
			post_id integer REFERENCES posts (id) ON DELETE CASCADE,
			content varchar(100)
    );
  `;
};

exports.down = async (sql) => {
  console.log('dropping comments');
  await sql`
    DROP TABLE comments
  `;
};
