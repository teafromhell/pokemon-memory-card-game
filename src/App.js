/* eslint-disable no-unused-vars */
import "./App.scss";

import { useState } from "react";
import PokemonCard from "./components/PokemonCard";


function App() {
  
  const [isLoading, setLoading] = useState(false);

 
  if (isLoading) {
    return <div className="app">Loading</div>;
  }
  return (
    <div className="app">
      

      <>
        <PokemonCard />
      </>
    </div>
  );
}

export default App;
