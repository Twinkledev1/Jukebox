import db from "#db/client";
import { createPlaylists } from "#db/queries/playlist";
import { createTracks } from "#db/queries/tracks";
import { createPlaylists_tracks } from "#db/queries/playlist_tracks";

async function seed() {
  try {
    // Clear old data to avoid duplicates
    await db.query("DELETE FROM playlists_tracks");
    await db.query("DELETE FROM playlists");
    await db.query("DELETE FROM tracks");

    console.log("🗑️ Old data cleared");

    // ------------------ Seed Tracks ------------------
    const tracks = [];
    for (let i = 1; i <= 20; i++) {
      const track = await createTracks({
        name: "Track " + i,
        duration_ms: 180000 + i * 1000,
      });
      tracks.push(track);
    }

    console.log("🎵 Tracks seeded");

    // ------------------ Seed Playlists ------------------
    const playlists = [];
    for (let j = 1; j <= 10; j++) {
      const playlist = await createPlaylists({
        name: "Playlist " + j,
        description: "Description " + j,
      });
      playlists.push(playlist);
    }

    console.log("📀 Playlists seeded");

    // ------------------ Seed Playlist-Tracks ------------------
    for (let k = 1; k <= 15; k++) {
      const playlist = playlists[Math.floor(Math.random() * playlists.length)];
      const track = tracks[Math.floor(Math.random() * tracks.length)];
      await createPlaylists_tracks({
        playlist_id: playlist.id,
        track_id: track.id,
      });
    }

    console.log("🔗 Playlist-Tracks associations seeded");
    console.log("🌱 Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.end();
  }
}

await db.connect();
await seed();
