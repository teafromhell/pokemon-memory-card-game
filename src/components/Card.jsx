import React from "react";
import "./Card.scss";
import { motion } from "framer-motion";

function Card({
  img,
  name,
  matched,
  active,
  handleClick,
  id,
  type,
  isLoading,
}) {
  return (
    <>
      {!isLoading ? (
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            rotateY: 180,
          }}
          onClick={() => handleClick(id)}
          className={`card   ${active ? "card--active" : ""} ${
            active ? type : ""
          } ${matched ? "card--matched" : ""}`}
        >
          <div className={`card__img ${active ? "card__img--active" : ""}`}>
            <img src={img} alt="pokemon" />
          </div>

          {/* <div>{name}</div> */}
        </motion.div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Card;
