import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MemberMission = sequelize.define('member_mission', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  member_id: { type: DataTypes.BIGINT },
  mission_id: { type: DataTypes.BIGINT },
  state: { type: DataTypes.ENUM('IN_PROGRESS', 'DONE') },
  completed_at: { type: DataTypes.DATE },
});

export default MemberMission;
