require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});

const { Client } = require("pg");

const [userId, rawCpf] = process.argv.slice(2);
const cpf = rawCpf?.replace(/\D/g, "");

if (
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    userId || "",
  )
) {
  throw new Error("Informe um userId UUID válido.");
}
if (!/^\d{11}$/.test(cpf || "")) {
  throw new Error("Informe um CPF com 11 dígitos.");
}

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
    const result = await client.query(
      'UPDATE users SET cpf = $1 WHERE id = $2 AND "isDeleted" = false RETURNING id',
      [cpf, userId],
    );
    if (result.rowCount !== 1)
      throw new Error("Usuário não encontrado ou removido.");
    console.log("CPF cadastrado para o usuário.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
