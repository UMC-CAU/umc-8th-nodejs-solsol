import { pool } from "../db.config.js";

export const insertMission = async (missionData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO missions (
        store_id, name, deadline, min_cost, reward, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        missionData.store_id,
        missionData.name,
        missionData.deadline,
        missionData.min_cost,
        missionData.reward,
        missionData.created_at,
        missionData.updated_at,
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const getMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM missions WHERE id = ?`, [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};
