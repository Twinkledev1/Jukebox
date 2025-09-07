import express from "express";
import { getTracks } from "../db/queries/tracks.js";

const trackRouter = express.Router();
export default trackRouter;

trackRouter.get("/", async (req, res) => {
  try {
    res.send(await getTracks());
  } catch (err) {
    console.error("Error fetching tracks:", err);
  }
});

trackRouter.get("/:id", async (req, res) => {
    try {
        const{id} = req.params;
        const track = await getTrackById(id);
      return res.send(track);

    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  });

