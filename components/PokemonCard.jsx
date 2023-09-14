"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonCard ({ pokemon, isCorrect }) {

  const [data, setData] = useState({});

// use useEffect when pokemon value changes from the props
  useEffect(() => {
    try {
      console.log(pokemon);
      const fetchData = async () => {
        if (!pokemon) return;
        const result = await axios.get(pokemon?.url);
        setData(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pokemon]); //Pass pokemon into the dependancy array


  return (
    <div className="card">
        <img
          src={data?.sprites?.front_default}
          alt={"loading image"}
          className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
          style={{
            marginTop: "50px"
          }}
        />
    </div>
  );
};