const config = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  DATABASE: {
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: process.env.DATABASE_PORT || 5432,
    USER: process.env.DATABASE_USER || 'root',
    PASSWORD: process.env.DATABASE_PASSWORD || '1234',
    DATABASE: process.env.DATABASE_NAME || 'ecommerce',
  },
  APP: {
    HOST: process.env.APP_HOST || 'http://localhost:4050',
    PORT: process.env.APP_PORT || 4050,
  },
};

module.exports = config;
