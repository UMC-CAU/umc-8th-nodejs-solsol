import { pool } from "../db.config.js";

// INSERT
export const insertReview = async (reviewData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO reviews (
        store_id, mem_id, content, rate, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        reviewData.store_id,
        reviewData.mem_id,
        reviewData.content,
        reviewData.rate,
        reviewData.created_at,
        reviewData.updated_at,
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

// SELECT
export const getReviewById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM reviews WHERE id = ?`, [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};
