import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Food = sequelize.define('food', {
  id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
  name: { type: DataTypes.STRING(20) },
},
{
  timestamps: false,
});

export default Food;
