import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopAlbums from "./pages/TopAlbums";
import AlbumWithSongs from "./pages/AlbumWithSongs.js";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Top Albums</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TopAlbums />} />
          <Route path="/album/:id" element={<AlbumWithSongs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
