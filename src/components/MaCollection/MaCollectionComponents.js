import React from "react";

const MyCollection = ({ collection }) => {
  return (
    <div>
      <h1>Ma Collection de Jeux</h1>
      {collection.length === 0 ? (
        <p>Aucun jeu dans la collection.</p>
      ) : (
        <div className="game-grid">
          {collection.map((game) => (
            <div key={game.id} className="game-card">
              <h2>{game.game_title}</h2>
              <p>{game.release_date}</p>
              <img
                src={`https://cdn.thegamesdb.net/images/thumb/boxart/front/${game.id}-1.jpg`}
                alt={game.game_title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollection;
