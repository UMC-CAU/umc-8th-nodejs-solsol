// store.repository.js
import { pool } from "../db.config.js";
// 특정 store 조회
export const getStoreById = async (storeId) => {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(`SELECT * FROM stores WHERE id = ?`, [storeId]);
      return rows[0] || null;
    } finally {
      conn.release();
    }
  };
  
  // region_id 업데이트
  export const updateStoreRegion = async (storeId, regionId) => {
    const conn = await pool.getConnection();
    try {
      await conn.query(`UPDATE stores SET region_id = ? WHERE id = ?`, [regionId, storeId]);
    } finally {
      conn.release();
    }
  };

  export const insertStore = async (storeData) => {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO stores (
          region_id,
          name,
          rate,
          category,
          owner_id,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          storeData.region_id,
          storeData.name,
          storeData.rate,
          storeData.category,
          storeData.owner_id,
          storeData.created_at,
          storeData.updated_at,
        ]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  };
  