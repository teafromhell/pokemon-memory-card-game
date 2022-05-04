import React from "react";
import "./Card.scss";
import { motion } from "framer-motion";

function Card({
  img,
  matched,
  active,
  handleClick,
  id,
  type,
  isLoading,
  name,
  visible,
}) {
  return (
    <>
      {!isLoading ? (
        <div
          onClick={() => handleClick(id)}
          className={`card   
          ${active ? "card--active" : ""} ${active || visible ? type : ""} ${
            matched ? "card--matched" : ""
          }
          ${visible ? "card--stop-hover" : ""}
          `}
        >
          <div
            className={`card__img ${
              active || visible ? "card__img--active" : ""
            }`}
          >
            <img src={img} alt="pokemon" />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Card;
