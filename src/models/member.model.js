// member.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Member = sequelize.define(
  'member',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    gender: { type: DataTypes.ENUM('MALE', 'FEMALE', 'UNCHOSEN') },
    birth: { type: DataTypes.DATE },
    address: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    point: { type: DataTypes.BIGINT },
    state: { type: DataTypes.INTEGER },
    deactivate_date: { type: DataTypes.DATE, allowNull: true },
    role: { type: DataTypes.ENUM('USER', 'STORE') },
    phone_number: { type: DataTypes.STRING(40) },
    email: { type: DataTypes.STRING(40) },
    password: { type: DataTypes.STRING(40) },
    is_phone_verified: { type: DataTypes.BOOLEAN },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    name: { type: DataTypes.STRING(40) },
  },
  {
    timestamps: false,
  }
);

export default Member;
