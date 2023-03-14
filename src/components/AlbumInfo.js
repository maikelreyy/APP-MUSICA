const AlbumInfo = ({ name, artistName, artwork }) => {
  return (
    <article>
      <img src={artwork} alt={`${name} artwork`} />
      <h2>{name}</h2>
      <h3>{artistName}</h3>
    </article>
  );
};

export default AlbumInfo;
