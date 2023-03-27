import { useEffect, useState } from "react"; 
import getAlbumWithSongs from "../services/getAlbumWithSongs";

const useAlbumWithSongs = (id) => {
  
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const fetchedAlbum = await getAlbumWithSongs(id);
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
