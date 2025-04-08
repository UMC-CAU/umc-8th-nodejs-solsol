import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Member = sequelize.define('member', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  gender: { type: DataTypes.ENUM('MALE', 'FEMALE', "UNCHOSEN") },
  birth: { type: DataTypes.DATE },
  address: { type: DataTypes.STRING(40) },
  point: { type: DataTypes.BIGINT },
  state: { type: DataTypes.INTEGER },
  deactivate_date: { type: DataTypes.DATE },
  role: { type: DataTypes.ENUM('USER', 'STORE') },
  phone_number: { type: DataTypes.BIGINT },
  email: { type: DataTypes.STRING(40) },
  is_phone_verified: { type: DataTypes.BOOLEAN },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
  name: { type: DataTypes.STRING(40) },
});

export default Member;
