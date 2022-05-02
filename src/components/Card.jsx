import React from "react";
import "./Card.scss";

function Card({ img, name, matched, active, handleClick, id }) {
  return (
    <div onClick={() => handleClick(id)} className={`card ${matched ? "card--matched" : ""}`}>
      <div className={`card__img ${active ? "card__img--active" : ""}`}>
        <img src={img} alt="pokemon" />
      </div>

      <div>{name}</div>
    </div>
  );
}

export default Card;
