export default {
  dbHost: "db",
  dbUser: process.env.POSTGRES_USER as string,
  dbPassword: process.env.POSTGRES_PASSWORD as string,
  dbPort: parseInt(process.env.DB_PORT as string, 10),
  dbName: process.env.POSTGRES_DB as string,
  port: parseInt(process.env.SERVER_PORT as string, 10),
};
