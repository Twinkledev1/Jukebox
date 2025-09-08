import db from "../client.js";

export async function createPlaylists(name, description) {
  try {
    const sql = `
      insert into playlists(name, description)
      values($1,$2)
      returning * `;
    const values = [name, description];

    const res = await db.query(sql, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating playlists", error);
    throw error;
  }
}

export async function getPlaylist(){
  try{
    const sql = `select * from playlists;`;
    const res = await db.query(sql);
    return res.rows;
  }
  catch(error){
  console.error("Error getting playlists", error);
  throw error;
  }
};

export async function getPlaylistById(id){
  try{
    const sql = `select * from playlists where id = $1;`;
    const res = await db.query(sql,[id]);
    return res.rows[0];
  }
  catch(error){
  console.error("Error getting playlists by id", error);
  throw error;
  }
};

export async function getTracksByPlaylistId(playlistId) {
  try {
    const sql = `
      SELECT tracks.*
      FROM tracks
      JOIN playlists_tracks 
        ON playlists_tracks.track_id = tracks.id
      JOIN playlists 
        ON playlists_tracks.playlist_id = playlists.id
      WHERE playlists.id = $1;
    `;
    const { rows } = await db.query(sql, [playlistId]);
    return rows;
  } catch (error) {
    console.error("Error getting tracks by playlist id", error);
    throw error;
  }
}


