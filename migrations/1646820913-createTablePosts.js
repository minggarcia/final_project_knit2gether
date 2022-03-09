exports.up = async (sql) => {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			user_id integer REFERENCES users (id) ON DELETE CASCADE,
			title varchar(20) NOT NULL,
			description varchar(100),
			needle_size varchar(30) ,
			yarn_name varchar(50)


    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE likes
  `;
};
