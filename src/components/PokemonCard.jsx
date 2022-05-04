/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PokemonCard.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import End from "./End";

function PokemonCard() {
  const [pokemons, setPokemon] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [count, setCount] = useState(2);
  const [isLoading, setLoading] = useState(false);
  const [callEnd, setCallEnd] = useState(false);

  const [storeId, setStoreId] = useState([]);
  const [inactive, setInactive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setStoreId((current) => [...current, Math.floor(Math.random() * 896)]);
    }
  }, []);

  const fetchRandom = async () => {
    if (pokemons) {
      setPokemon([]);
      setCount(2);
      setCallEnd(false);
      setStoreId([]);
    }

    for (let i = 0; i < 6; i++) {
      setStoreId((current) => [...current, Math.floor(Math.random() * 896)]);
    }
    function getRandomPoke() {
      storeId.forEach(async (item) => {
        const resp = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${item}`
        );
        const data = await resp.data;
        setPokemon((current) => [
          ...current,
          { ...data, matched: false, active: false, id: uuidv4() },
          { ...data, matched: false, active: false, id: uuidv4() },
        ]);
        setLoading(false);
      });

      setLoading(true);
    }

    getRandomPoke();
  };
  function check(current) {
    setInactive(true);
    if (pokemons[current].name === pokemons[prev].name) {
      pokemons[current].active = true;
      pokemons[current].matched = true;
      pokemons[prev].matched = true;
      setPokemon([...pokemons]);
      setPrev(-1);
      setCount(count + 2);
      setInactive(false);
      if (count === pokemons.length) {
        setTimeout(() => {
          setCallEnd(true);
        }, 700);
      }
    } else {
      pokemons[current].active = true;
      setPokemon([...pokemons]);
      setTimeout(() => {
        pokemons[current].matched = false;
        pokemons[current].active = false;
        pokemons[prev].matched = false;
        pokemons[prev].active = false;
        setInactive(false);
        setPokemon([...pokemons]);
        setPrev(-1);
      }, 1000);
    }
  }

  function handleClick(id) {
    if (prev === -1) {
      pokemons[id].active = true;
      setPokemon([...pokemons]);
      setPrev(id);
    } else {
      check(id);
    }
  }
  return (
    <>
      {callEnd && <End fetchData={fetchRandom} />}
      <div className="btn-container">
        <button className="start-btn" onClick={() => fetchRandom()}>
          Start
        </button>
        <button onClick={() => setVisible(!visible)} className="show-btn">
          X-ray
        </button>
      </div>
      <div className={`game ${inactive ? "game--inactive" : ""}`}>
        {!isLoading ? (
          pokemons
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item, index) => {
              return (
                <Card
                  img={item.sprites.front_default}
                  matched={item.matched}
                  active={item.active}
                  name={item.name}
                  id={index}
                  handleClick={handleClick}
                  type={item.types[0].type.name}
                  isLoading={isLoading}
                  inactive={item.inactive}
                  visible={visible}
                />
              );
            })
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default PokemonCard;
