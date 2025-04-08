import dotenv from 'dotenv';
dotenv.config(); // 💥 가장 먼저 호출해야 함!

import sequelize from './config/database.js';

console.log('[DEBUG] USER:', process.env.DB_USER);
console.log('[DEBUG] PASS:', process.env.DB_PASS);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB 연결 성공!');
  } catch (error) {
    console.error('❌ DB 연결 실패:', error);
  }
})();
