import { useParams } from "react-router-dom";
import useAlbumWithSongs from "../hooks/useAlbumWithSongs.js";
import ErrorMessage from "../components/ErrorMessage";
import LoadingIcon from "../components/LoadingIcon";
import AlbumInfo from "../components/AlbumInfo.js";
//import AlbumSong from "../components/AlbumSong.js";
import AlbumSongList from "../components/AlbumSongList.js";
//flujo: cuando carga la página albumWithSongs, recoge el id de los parametros y llama al hook
//useAlbumWithSongs con el id del album.
const AlbumWithSongs = () => {
  const { id } = useParams();
  //console.log(id);

  const { album, songList, loading, error } = useAlbumWithSongs(id);

  //hacemos destructuring de album.info
  //en el primer render album.info esta vacio, por lo tanto nos dará error al hacerle el destructuring
  //const {name, artistName, artwork} = album.info nos daria error. para arreglarlo:
  //const { name, artistName, artwork } = album.info || {}; //con el ||{} le estamos diciendo que haga el destructuring del objeto vacio y no nos dara error, este borreino pa facer o de abaixo
  /*
  const {
    info: { name, artistName, artwork },
    songs,
  } = album;
*/
  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const checkObjUnd = (obj) => {
    const valList = Object.values(obj);

    let response = true;
    for (const v in valList) {
      if (v === undefined) {
        response = false;
        break;
      }
    }
    return response;
  };

  return (
    <>
      {checkObjUnd(album) === true ? (
        <AlbumInfo
          name={album.albumName}
          artistName={album.artistName}
          artwork={album.artwork}
        />
      ) : null}
      {checkObjUnd(songList) === true ? (
        <AlbumSongList songs={songList} />
      ) : null}
    </>
  );
  //porque non me marca error se poño os <> </>? par que era?
  //se es src poño {album.artwork} ponme que artwork non se usa pero se poño {artwork} ponmo como ven
  //que pasa, tame dando un error no fetch non sei porque e nn podo comprobalo
  /*
    <>
      <AlbumInfo name={name} artistName={artistName} artwork={artwork} />
      {songs.lenght > 0 && <AlbumSongList songs={songs} />}
    </>
*/
};

export default AlbumWithSongs;
