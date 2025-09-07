import db from "../client.js";

export async function createTracks({ name, duration_ms }) {
  try {
    const sql = `
      INSERT INTO tracks(name, duration_ms)
      VALUES($1, $2)
      RETURNING *`;
      
    const values = [name, duration_ms];
    const res = await db.query(sql, values);
    return res.rows[0]; // just one track, not an array
  } catch (error) {
    console.error("Error creating tracks", error);
    throw error;
  }
}
