import db from "../client.js";

export async function createTracks({name, duration_ms}) {
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

export async function getTracks(){
  try{
    const sql = `select * from tracks;`;
    const res = await db.query(sql);
    return res.rows;
  }
  catch(error){
  console.error("Error getting tracks", error);
  throw error;
  }
};

export async function getTracksById(){
  try{
    const sql = `select * from tracks where id = $1;`;
    const res = await db.query(sql,[id]);
    return res.rows[0];
  }
  catch(error){
  console.error("Error getting track id", error);
  throw error;
  }
}
