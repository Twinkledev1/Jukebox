import db from "#db/client";
import { createPlaylists } from "#db/queries/playlist";
import { createTracks } from "#db/queries/tracks";
import { createPlaylists_tracks } from "#db/queries/playlist_tracks";

async function seed() {
  const tracks = [];
  for (let i = 1; i <= 20; i++) {
    const track = await createTracks("Track " + i, 180000 + i * 1000);
    tracks.push(track);
  }

  const playlists = [];
  for (let j = 1; j <= 10; j++) {
    const playlist = await createPlaylists("Playlist " + j, "Description " + j);
    playlists.push(playlist);
  }

  for (let k = 1; k <= 15; k++) {
    const playlist = playlists[Math.floor(Math.random() * playlists.length)];
    const track = tracks[Math.floor(Math.random() * tracks.length)];
    await createPlaylists_tracks(playlist.id, track.id);
  }
}

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");
