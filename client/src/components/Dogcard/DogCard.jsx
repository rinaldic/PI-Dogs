import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import sty from "./DogCard.module.css";

export default function DogCard ({ name, id, weight, image, temperaments }) {

  const history = useHistory();
  function handleClickCard() {
    history.push(`/details/${id}`);
  }
  const dark = useSelector((state) => state.dark);
  return (
    <div onClick={handleClickCard} className={dark?sty.dark_card:sty.card}>
      
      <img className={sty.image} src={image} alt="" />
     
      <div className={ sty.text }>
        <strong>{name}</strong>
        <p className={sty.weight}>
          <strong>Weight: </strong>
          {weight?weight:"10-50"}
        </p>
        <p className={sty.temperaments}>
          <strong>Temperament: </strong>
          {temperaments}.
        </p>
      </div>
    
    </div>
  );
};


