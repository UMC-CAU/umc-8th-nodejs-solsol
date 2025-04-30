import { pool } from "../db.config.js";

export const insertMemberMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO member_missions (
        member_id, mission_id, state, completed_at
      ) VALUES (?, ?, ?, ?)`,
      [
        data.member_id,
        data.mission_id,
        data.state,
        data.completed_at,
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const getMemberMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM member_missions WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};
