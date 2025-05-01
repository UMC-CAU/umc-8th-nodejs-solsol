import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Region = sequelize.define('region', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  name: { type: DataTypes.STRING(20) },
},
{
  timestamps: false,
});

export default Region;
