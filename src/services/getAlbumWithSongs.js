//necesitamos mandarle el id de alguna forma,asique se lo mandamos por parametro.

const getAlbumWithSongs = async (id) => {
  /*hay que indicarle que el elemento que queremos son las canciones, por eso lo de entity=song*/
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    )}`
  );

  if (!res.ok) {
    throw new Error("no se pudo cargar el album, intentalo de nuevo mas tarde");
  }

  const body = await res.json();

  const album = (obj) => {
    const id = obj.collectionId;
    const albumName = obj.collectionCensoredName;
    const artistName = obj.artistName;
    const artwork = obj.artworkUrl100;
    return { id, artistName, albumName, artwork };
  };

  const song = (obj) => {
    const id = obj.trackId;
    const songName = obj.trackName;
    const number = obj.trackNumber;
    const prevUrl = obj.previewUrl;
    return { id, songName, number, prevUrl };
  };

  const response = [];
  for (let i = 0; i < JSON.parse(body.contents).results.length; i++) {
    i === 0
      ? response.push(album(JSON.parse(body.contents).results[i]))
      : response.push(song(JSON.parse(body.contents).results[i]));
  }

  return response;
};

export default getAlbumWithSongs;
