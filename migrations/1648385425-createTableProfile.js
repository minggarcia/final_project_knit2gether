exports.up = async (sql) => {
  await sql`
    CREATE TABLE profile (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      post_id integer REFERENCES posts (id) ON DELETE CASCADE,
      image varchar(100) NOT NULL,
      bio text NOT NULL


    );
  `;
};

exports.down = async (sql) => {
  console.log('dropping profile');
  await sql`
    DROP TABLE profile
  `;
};
