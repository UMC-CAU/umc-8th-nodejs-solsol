import sequelize from './config/database.js';

import Member from './models/member.model.js';
import Food from './models/food.model.js';
import Region from './models/region.model.js';
import Store from './models/store.model.js';
import Review from './models/review.model.js';
import Mission from './models/mission.model.js';
import MemberFood from './models/member_food.model.js';
import MemberMission from './models/member_mission.model.js';

(async () => {
  try {
    await sequelize.sync({ force: true }); // 🧨 초기화용
    console.log('✅ 모든 테이블이 생성되었습니다!');
  } catch (err) {
    console.error('❌ 테이블 생성 실패:', err);
  } finally {
    await sequelize.close();
  }
})();
