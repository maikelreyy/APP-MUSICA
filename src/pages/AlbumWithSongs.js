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
 

  const { album, songList, loading, error } = useAlbumWithSongs(id);

  //hacemos destructuring de album.info
  //en el primer render album.info esta vacio, por lo tanto nos dará error al hacerle el destructuring
  //const {name, artistName, artwork} = album.info nos daria error. para arreglarlo:
  
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

};

export default AlbumWithSongs;
