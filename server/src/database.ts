import knex from "knex";
import config from "./config";

export const db = knex({
  client: "pg",
  connection: {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  },
});
