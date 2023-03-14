import useTopAlbums from "../hooks/useTopAlbums";
import LoadingIcon from "../components/LoadingIcon";
import ErrorMessage from "../components/ErrorMessage";
import AlbumInfo from "../components/AlbumInfo";
import { Link } from "react-router-dom";

//hacemos la pagina principal
const TopAlbums = () => {
  const { albums, loading, error } = useTopAlbums();

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    //aqui traemos o componente entre < e /> non?
    return <ErrorMessage error={error} />; //non entendo o de error={ error }
  }

  return (
    <ul>
      {albums.map((album) => {
        //cuando la clave y el valor del objeto son iguales, solo se pone 1 vez, es decir, si id:id pasaria a ser solo id
        const { id, name, artistName, artworkUrl100: artwork } = album;

        return (
          //creamos un link dentro del li para que vaya a album (nos muestre una pagina con todo ese album) y el id del album
          //hacemos un template string para que nos lleve a la pagina// nn me acordo de pa que era o $
          //PORQUE ME DA UN ERROR NO LINK SE E DE REACT ROUTER DOM SE NON O IMPORTO  PERO NA CLASE NON LLE DA SIN IMPORTALA?
          <li key={id}>
            <Link to={`/album/${id}`}>
              <AlbumInfo
                name={name}
                artistName={artistName}
                artwork={artwork}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TopAlbums;
