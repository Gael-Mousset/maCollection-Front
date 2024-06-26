import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlatformDetails, getPlatformById } from "../../enum/platforms";
import "./MaCollectionComponents.css";

const MyCollection = () => {
  const [collection, setCollection] = useState([]);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games", {
          params: { platform },
        });
        const sortedGames = response.data.sort((a, b) =>
          a.game_title.localeCompare(b.game_title)
        );
        setCollection(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la collection :",
          error
        );
      }
    };

    fetchCollection();
  }, [platform]);

  const removeFromCollection = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      setCollection(collection.filter((game) => game._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du jeu :", error);
    }
  };

  return (
    <div>
      <h1>Ma Collection de Jeux</h1>
      <div className="collection-filter">
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Toutes les plateformes</option>
          {Object.values(PlatformDetails).map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>
      {collection.length === 0 ? (
        <p>Aucun jeu dans la collection.</p>
      ) : (
        <div className="game-grid">
          {collection.map((game) => {
            const platformInfo = getPlatformById(game.platform);
            console.log();
            return (
              <div key={game._id} className="game-card">
                <h2>{game.game_title}</h2>
                <p>{game.release_date}</p>
                <img
                  src={`https://cdn.thegamesdb.net/images/thumb/boxart/front/${game.id}-1.jpg`}
                  alt={game.game_title}
                />
                {platformInfo && <p> {platformInfo.name}</p>}
                <button
                  className="delete-button"
                  onClick={() => removeFromCollection(game._id)}
                >
                  Supprimer
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
