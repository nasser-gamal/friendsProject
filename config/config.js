exports.config = {
  app: {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    filesPath: process.env.FILE_PATH,
  },
  db: {
    db_name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
