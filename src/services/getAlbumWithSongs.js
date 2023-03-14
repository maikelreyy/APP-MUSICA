//necesitamos mandarle el id de alguna forma,asique se lo mandamos por parametro.

const getAlbumWithSongs = async (id) => {
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      //camiamos la api a la que le vamos a hacer la peticion, porque?
      //hay que indicarle que el elemento que queremos son las canciones, por eso lo de entity=song
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    )}`
  );

  if (!res.ok) {
    throw new Error("no se pudo cargar el album, intentalo de nuevo mas tarde");
  }

  const body = await res.json();

  //despues de hacer esto, hacemos un console.log(body) para ver en consola los datos que nos devuelve la api y poder crear la peticion correctamente.
  //esto nos devuelve un objeto llamado contents, entonces:
  //hacemos un console.log(JSON.parse(body.contents)) => console.log(JSON.parse(body.contents).results) para ver los datos del objeto parseado. (resultCount) y array de results( cada objeto es una cancion)

  //destructuring del array que nos da la api de results
  //con el [info, ...songs] estamos diciendo que la primera posicion (info del album) la guarde en info y todo lo demas en songs (las canciones)
  //con los ... decimos que meta todo lo que hay despues de lo ultimo que indicamos.
  //const [info, ...songs] = JSON.parse(body.contents).results //non sei porque results vai fora do parentesis
  //filtramos os datos que recollemos da api facendo destructuring
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
