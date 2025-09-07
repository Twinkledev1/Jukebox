import express from "express";
import trackRouter from "./api/tracks.js";
import playlistRouter from "#api/playlist";

const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is JUKEBOX for track system");
  });

app.use("/tracks", trackRouter);
app.use("/playlists", playlistRouter);
// app.use("/playlistTracks", playlistTracksRouter);