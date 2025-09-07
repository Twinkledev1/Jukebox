import db from "../client.js";

export async function createPlaylists({name,description}){
    try {
        const sql = `
      insert into playlists(name, description)
      values($1,$2)
      returning * `;
        const values = [name, description];
    
        const res = await db.query(sql, values);
        return res.rows;
      } catch (error) {
        console.error("Error creating playlists", error);
        throw error;
      }
}