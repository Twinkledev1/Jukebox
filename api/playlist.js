import express from "express";
import { getPlaylist } from "../db/queries/playlist.js";
import { createPlaylists } from "../db/queries/playlist.js";
import { getPlaylistById } from "../db/queries/playlist.js";
import { getTracksByPlaylistId } from "../db/queries/playlist.js";
import { createPlaylists_tracks } from "../db/queries/playlist_tracks.js";

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
    const { id } = req.params;
    const playlist = await getPlaylistById(id);
    res.send(playlist);
  } catch (err) {
    console.error("Error fetching playlists by id:", err);
  }
});

playlistRouter.get("/:id/tracks", async (req, res) => {
  try {
    const { id } = req.params;
    const playlist_track_id = await getTracksByPlaylistId(id);
    res.send(playlist_track_id);
  } catch (err) {
    console.error("Error fetching playlists by tracks id:", err);
  }
});

playlistRouter.post("/:id/tracks", async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { trackId } = req.body;

    if (!trackId) {
        return res.status(400).json({ error: "trackId is required in body" });
      }
  
    const playlist_track = await createPlaylists_tracks(playlistId, trackId);
    res.status(201).send(playlist_track);
  } catch (err) {
    console.error("Error creating playlists by  track id:", err);
    res.send(err);
  }
});
