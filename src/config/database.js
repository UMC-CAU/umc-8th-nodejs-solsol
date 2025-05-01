// src/config/database.js
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // .env 파일 읽기
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // SQL 로그 보기 싫으면 false
  }
);

export default sequelize;
