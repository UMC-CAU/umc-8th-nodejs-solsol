//store.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Store = sequelize.define('store', {
  id: { type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
   },
  region_id: { type: DataTypes.BIGINT },
  name: { type: DataTypes.STRING(20) },
  rate: { type: DataTypes.INTEGER },
  category: { type: DataTypes.ENUM('CHINESE', 'JAPANESE', 'FRENCH', 'ITALIAN', 'AMERICAN','MEXICAN','KOREAN','VIETNAMESE','ETC') },
  owner_id: { type: DataTypes.BIGINT },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
},
{
  timestamps: false,
}
);

export default Store;
