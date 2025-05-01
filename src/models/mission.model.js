//mission.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Mission = sequelize.define('mission', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  store_id: { type: DataTypes.BIGINT },
  name: { type: DataTypes.STRING(20) },
  deadline: { type: DataTypes.DATE },
  min_cost: { type: DataTypes.INTEGER },
  reward: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
},
{
  timestamps: false,
});

export default Mission;
