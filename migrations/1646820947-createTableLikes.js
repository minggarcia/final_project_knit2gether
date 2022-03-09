exports.up = async (sql) => {
  await sql`
    CREATE TABLE likes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			user_id integer REFERENCES users (id) ON DELETE CASCADE,
			post_id integer REFERENCES posts (id) ON DELETE CASCADE


    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE likes
  `;
};
