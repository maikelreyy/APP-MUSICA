import { useEffect, useState } from "react";
import getTopAlbums from "../services/getTopAlbums";


const useTopAlbums = () => {
  //creamos un estado que empezara siendo un array vacio y meteremos en ese estado los results del objeto contents que nos da la api
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //recogemos datos de la api para poder trabajar con ella
  //haremos un fetch a la api con un useEffect, recibe dos parametros, el callback y el array con las dependencias que vamos a monitorizar
  //el callback de useEffect debe ser asincrona (sync/await) asique hacemos funcion asincrona
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        //creamos un estado antes del fetch que indique que esta cargando y lo ponemos en verdadero
        setLoading(true);
        //utilizaremos una api de all origins para que haga de intermediaria, te proxy, y no nos dea errores en las peticiones (porque no se permiten peticiones cruzadas)
        const fetchedAlbums = await getTopAlbums();

        setAlbums(fetchedAlbums);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        //una vez acaba de cargar y tenemos los datos el setloading lo ponemos en false
        setLoading(false);
      }
    };
    //llamcamos a la funcion para que se ejecute despues del primer render
    fetchAlbums();
  }, []);
  //retornamos/devolvemos albums, carga y error
  return { albums, loading, error }; // porque vai entre chaves?
};

export default useTopAlbums;
