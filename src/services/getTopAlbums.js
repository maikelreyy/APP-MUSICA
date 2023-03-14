const getTopAlbums = async () => {
  const res = await fetch(`
        https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://rss.applemarketingtools.com/api/v2/us/music/most-played/50/albums.json"
        )}`);
  //gestionamos si la respuesta de la api viene mal
  if (!res.ok) {
    throw new Error(
      "no se pudieron cargar los albums, intentalo de nuevo mas tarde"
    );
  }
  //traemos el body de la api
  const body = await res.json();
  //la api nos da un objeto (contents) asique parseamos el objeto contents del body para llegar a results que es lo que nos interesa (mirar la api)
  const fetchedAlbums = JSON.parse(body.contents).feed.results;
  //el estado cambia y pasamos de tener un array vacio a llenarlo con los datos de la api, al hacer el parse accedo a feed y de feed accedo a results.
  return fetchedAlbums;
};

export default getTopAlbums;
