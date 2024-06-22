import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [img, setImg] = useState([]);
  const apiKey =
    "e2632452c70b87623a7abd8f06273b80f723db6158242bebb380284efa6a251c"; // Remplacez par votre clé API TheGamesDB

  const searchGames = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/v1/Games/ByGameName`, {
        params: {
          apikey: apiKey,
          name: query,
        },
      });
      console.log(response.data.data.games);
      console.log(response.data.data);
      setGames(response.data.data.games);
      setImg(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la recherche des jeux :", error);
    }
  };

  return (
    <div>
      <h1>Recherche de Jeux Vidéo</h1>
      <form onSubmit={searchGames}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez un jeu vidéo"
        />
        <button type="submit">Rechercher</button>
      </form>
      <div>
        {games &&
          games.map((game) => (
            <div key={game.id}>
              <h2>{game.game_title}</h2>
              <p>{game.release_date}</p>
              <img
                src={`https://cdn.thegamesdb.net/images/thumb/boxart/front/${game.id}-1.jpg`}
                alt={game.game_title}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
