import db from "../client.js";

export async function createPlaylists_tracks({playlist_id, track_id}){
    try {
        const sql = `
      insert into playlists_tracks(playlist_id, track_id)
      values($1,$2)
      returning * `;
        const values = [playlist_id, track_id];
    
        const res = await db.query(sql, values);
        return res.rows[0];
      } catch (error) {
        console.error("Error creating playlists_tracks", error);
        throw error;
      }
}


