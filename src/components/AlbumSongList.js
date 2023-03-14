import AlbumSong from "./AlbumSong";

const AlbumSongList = ({ songs }) => {
  return (
    <ul
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(1, 50%)",
        gridTemplateRows: "repeat(3, auto)",
        gridGap: "1rem 2rem",
      }}
    >
      {songs.map((song) => {
        const { songName, prevUrl, number } = song; //hacemos destructuring de songs y traemos lo que nos interesa
        return (
          <li key={number}>
            <AlbumSong
              trackName={songName}
              previewUrl={prevUrl}
              number={number}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default AlbumSongList;
