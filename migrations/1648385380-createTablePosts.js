exports.up = async (sql) => {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      image varchar(300) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      title varchar(50) NOT NULL,
      description varchar(300),
      needle_size varchar(30) ,
      yarn_name varchar(50)
    );
  `;
};

exports.down = async (sql) => {
  console.log('dropping posts');
  await sql`
    DROP TABLE posts
  `;
};
