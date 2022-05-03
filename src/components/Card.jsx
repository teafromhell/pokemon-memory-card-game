import React from "react";
import "./Card.scss";
import { motion } from "framer-motion";

function Card({ img, name, matched, active, handleClick, id, type }) {
  //console.log(type)
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        rotateY: 180,
      }}
      
      onClick={() => handleClick(id)}
      className={`card ${matched ? "card--matched" : ""} ${
        active ? "card--active" : ""
      }`}
    >
      <div 
      className={`card__img ${active ? "card__img--active" : ""}`}>
        <img src={img} alt="pokemon" />
      </div>

      <div>{name}</div>
    </motion.div>
  );
}

export default Card;
