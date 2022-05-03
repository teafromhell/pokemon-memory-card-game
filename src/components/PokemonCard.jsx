/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PokemonCard.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import End from "./End";
import RandomizeChoice from "./RandomizeChoice";

function PokemonCard() {
  const [pokemons, setPokemon] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [count, setCount] = useState(2);
  const [isLoading, setLoading] = useState(false);
  const [callEnd, setCallEnd] = useState(false);

  const [storeId, setStoreId] = useState([]);
  

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setStoreId((current) => [...current, Math.floor(Math.random() * 896)]);
    }
  }, []);





  // const fetchData = async () => {
  //   if (pokemons) {
  //     setPokemon([]);
  //     setCount(2);
  //     setCallEnd(false);
  //   }
  //   const response = await axios.get(
  //     `https://pokeapi.co/api/v2/pokemon?limit=3`
  //   );
  //   const data = await response.data.results;

  //   function getPoke(data) {
  //     data.forEach(async (item) => {
  //       const res = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${item.name}`
  //       );
  //       const data = await res.data;
  //       setPokemon((current) => [
  //         ...current,
  //         { ...data, matched: false, active: false, fail: false, id: uuidv4() },
  //         { ...data, matched: false, active: false, fail: false, id: uuidv4() },
  //       ]);
  //     });
  //   }
  //   getPoke(data);
  // };
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
          { ...data, matched: false, active: false, fail: false, id: uuidv4() },
          { ...data, matched: false, active: false, fail: false, id: uuidv4() },
        ]);
        setLoading(false)
          
        
      });
      
      setLoading(true)
    } 
    
    getRandomPoke();
    
  };
  function check(current) {
    if (pokemons[current].name === pokemons[prev].name) {
      pokemons[current].active = true;
      pokemons[current].matched = true;
      pokemons[prev].matched = true;
      setPokemon([...pokemons]);
      setPrev(-1);
      setCount(count + 2);
      if (count === pokemons.length) {
        setTimeout(() => {
          setCallEnd(true);
        }, 700);
      }
    } else {
      pokemons[current].active = true;
      pokemons[current].fail = true;
      pokemons[prev].fail = true;
      setPokemon([...pokemons]);
      setTimeout(() => {
        pokemons[current].fail = false;
        pokemons[current].matched = false;
        pokemons[current].active = false;
        pokemons[prev].fail = false;
        pokemons[prev].matched = false;
        pokemons[prev].active = false;
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
  // if (isLoading) {
  //   return <div className="game">Loading</div>;
  // }
  return (
    <>
      {callEnd && <End fetchData={fetchRandom} />}
      {/* <button onClick={() => fetchRandom()}>Random</button> */}
      <div className="game">
        <button className="game__start-btn" onClick={() => fetchRandom()}>
          Start
        </button>
       {/* { pokemons
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
                />);
              })} */}

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
