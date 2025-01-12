require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  apiUrl: process.env.FAKESTORE_API_URL,
  nodeEnv: process.env.NODE_ENV,
};

module.exports = config;
