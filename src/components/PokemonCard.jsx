import React, { useState } from "react";
import Card from "./Card";
import "./PokemonCard.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function PokemonCard() {
  const [pokemons, setPokemon] = useState([]);
  const [prev, setPrev] = useState(-1);
  const fetchData = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=3`
    );
    const data = await response.data.results;

    function getPoke(data) {
      data.forEach(async (item) => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${item.name}`
        );
        const data = await res.data;
        setPokemon((current) => [
          ...current,
          { ...data, matched: false, active: false, fail: false, id: uuidv4() },
          { ...data, matched: false, active: false, fail: false, id: uuidv4() },
        ]);
      });
    }
    getPoke(data);
  };
  // const [lastName, setLastName] = useState('')

  // useEffect(()=>{
  //     pokemons.forEach((item)=>{

  //         setLastName(item.name)
  //     })
  // },[openCard])

  //   function timeout(ms){
  //     return new Promise(resolve => setTimeout(resolve, ms))
  //   }

  //   const checkCard = () => {
  //       console.log(pokemon.name)
  //     setPokemon(
  //       pokemons.map((item) => {
  //         if (item.id === pokemon.id) {
  //           return { ...item, active: true };
  //         }
  //         return item;
  //       })
  //     );

  //     if (check === "") {
  //       pokemons.forEach((item) => {
  //         if (item.id === pokemon.id) {
  //           setCheck(item);
  //         }
  //       });
  //     } else {
  //       setPokemon(
  //         pokemons.filter(
  //           (item) =>
  //             item.id !== pokemon.id &&
  //             item.order !== check.order
  //         )
  //       );
  //       setCheck("");
  //   setPokemon(
  //     pokemons.map((item) => {
  //       if (item.id === pokemon.id && pokemon.name === check.name) {

  //         return { ...item, matched: true, active: true };
  //       }
  //       setCheck('')
  //       return item
  //     })
  //   );
  //     }
  //   };

  //   setPokemon(pokemons.map((el)=>{
  //     if (el.id === check.id) {
  //         console.log(check.name)
  //         return {...el, matched: true, active: true}
  //     }
  //     return el
  // }))

  function check(current) {
    console.log(
      "current + order " + current,
      pokemons[current].name,
      pokemons[prev].name
    );
    if (pokemons[current].name === pokemons[prev].name) {
      pokemons[current].active = true;
      pokemons[current].matched = true;
      pokemons[prev].matched = true;
      setPokemon([...pokemons]);
      setPrev(-1);
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
    //console.log(pokemons[id])
    console.log("_________ " + id);
    console.log("name " + pokemons[id].name);
    //const index = pokemons[order].order;

    if (prev === -1) {
      pokemons[id].active = true;
      console.log(pokemons[id].active);
      setPokemon([...pokemons]);
      setPrev(id);
      console.log("prevOrder" + prev);
    } else {
      console.log("prev before" + prev);
      check(id);
      console.log("prev " + prev);
    }
  }

  return (
    <>
      <button className="app__start-btn" onClick={() => fetchData()}>
        Start
      </button>
      {pokemons
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
            />
          );
        })}
    </>
  );
}

export default PokemonCard;
