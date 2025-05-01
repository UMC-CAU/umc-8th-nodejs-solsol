import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MemberFood = sequelize.define('member_food', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  mem_id: { type: DataTypes.BIGINT },
  food_id: { type: DataTypes.BIGINT },
},
{
  timestamps: false,
});

export default MemberFood;
