import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  database: process.env.DB_URL || "mongodb://localhost:27017/testBase",
  jwt: process.env.JWT_TOKEN || "asdasdawe"
};
