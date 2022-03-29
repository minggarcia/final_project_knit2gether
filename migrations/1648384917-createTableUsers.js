exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL UNIQUE,
      password_hash varchar(100) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  console.log('dropping users');
  await sql`
    DROP TABLE users
  `;
};
