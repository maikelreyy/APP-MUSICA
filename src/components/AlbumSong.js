const AlbumSong = ({ number, trackName, previewUrl }) => {
  return (
    <article
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p>{number}</p>
      <p>{trackName}</p>
      <audio src={previewUrl} controls>
        tu navegador no soporta la etiqueta audio de HTML5
      </audio>
    </article>
  );
};

export default AlbumSong;
