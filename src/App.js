import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBarComponents";
import SearchComponent from "./components/Search/SearchComponent";
import MyCollection from "./components/MaCollection/MaCollectionComponents";

const App = () => {
  const [collection, setCollection] = useState([]);
  const addToCollection = (game) => {
    setCollection([...collection, game]);
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<SearchComponent addToCollection={addToCollection} />}
            />
            <Route
              path="/collection"
              element={<MyCollection collection={collection} />}
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
