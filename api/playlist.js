import express from "express";
import { getPlaylist } from "../db/queries/playlist.js";
import{createPlaylists} from "../db/queries/playlist.js";
import { getPlaylistById } from "../db/queries/playlist.js";
import {getPlaylistByTrackId} from "../db/queries/playlist.js";

const playlistRouter = express.Router();
export default playlistRouter;

playlistRouter.get("/", async (req, res) => {
  try {
    res.send(await getPlaylist());
  } catch (err) {
    console.error("Error fetching playlists:", err);
  }
});


playlistRouter.post("/", async (req, res) => {
    try {
       
       const playlist = await createPlaylists(req.body.name, req.body.description);
res.send(playlist);

    } catch (err) {
      console.error("Error creating playlists:", err);
    }
  });

  playlistRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const playlist = await getPlaylistById(id);
      res.send(playlist);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  });


  playlistRouter.get("/:id/tracks", async (req, res) => {
    try {
        const {id} = req.params;
        const playlist_track_id = await getPlaylistByTrackId(id);
      res.send(playlist_track_id);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  });

  

