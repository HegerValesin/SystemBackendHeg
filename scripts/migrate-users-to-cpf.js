require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});

const { Client } = require("pg");

async function main() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "logistica_db",
  });

  await client.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS cpf varchar",
    );
    await client.query(`
      UPDATE users AS usuario
      SET cpf = regexp_replace(motorista.cpf, '\\D', '', 'g')
      FROM motoristas AS motorista
      WHERE usuario."motoristaId" = motorista.id
        AND usuario.cpf IS NULL
    `);
    await client.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS "IDX_users_cpf_unique" ON users (cpf) WHERE cpf IS NOT NULL',
    );
    await client.query("COMMIT");
    console.log(
      "CPF migration completed. Users without a linked driver require CPF registration through PUT /users/:id.",
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
