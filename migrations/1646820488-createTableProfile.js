exports.up = async (sql) => {
  await sql`
    CREATE TABLE profile (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      bio varchar(200) NOT NULL,
			user_id integer REFERENCES users (id) ON DELETE CASCADE


    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE profile
  `;
};
