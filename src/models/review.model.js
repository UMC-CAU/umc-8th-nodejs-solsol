import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Review = sequelize.define('review', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  store_id: { type: DataTypes.BIGINT },
  mem_id: { type: DataTypes.BIGINT },
  content: { type: DataTypes.STRING(200) },
  rate: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
});

export default Review;
