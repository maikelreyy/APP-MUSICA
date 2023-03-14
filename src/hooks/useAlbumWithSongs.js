import { useEffect, useState } from "react"; //porque coño no me funciona el useEffect?
import getAlbumWithSongs from "../services/getAlbumWithSongs";

const useAlbumWithSongs = (id) => {
  //iniciamos el estado con un array y no un objeto como en el otro hook
  //const [album, setAlbum] = useState({ info: {}, songs: [] }); //aqui le indicamos que info sera un objeto vacio en el esado de inicio porque en el primer render esta vacio y songs un array vacio, asi podemos hacer destructuring sin que nos de error.
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const fetchedAlbum = await getAlbumWithSongs(id); //lo llamamos para que haga el fetch y nos de la informacion requerida, el album con las canciones. le pasamos el id del album.
        for (let i = 0; i < fetchedAlbum.length; i++) {
          i === 0
            ? setAlbum(fetchedAlbum[i])
            : setSongs((songs) => [...songs, fetchedAlbum[i]]);
        }
        //setAlbum(fetchedAlbum);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);
  const songList = Array.from(
    songs.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()
  );

  return { album, songList, loading, error };
};

export default useAlbumWithSongs;
