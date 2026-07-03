async function searchSongs() {
  const q = document.getElementById("searchInput").value;

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=20`;
  const res = await fetch(url);
  const data = await res.json();

  const songs = data.results.map(song => ({
    title: song.trackName,
    artist: song.artistName,
    album: song.collectionName,
    artwork: song.artworkUrl100,
    preview: song.previewUrl
  }));

  renderSongs(songs);
}

function renderSongs(songs) {
  const container = document.getElementById("songsContainer");
  container.innerHTML = "";

  if (!songs.length) {
    container.textContent = "No songs found.";
    return;
  }

  songs.forEach(song => {
    const div = document.createElement("div");
    div.className = "song-card";

    div.innerHTML = `
      <img src="${song.artwork}" />
      <div class="song-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <p>${song.album}</p>
        <audio controls src="${song.preview}"></audio>
      </div>
    `;

    container.appendChild(div);
  });
}
