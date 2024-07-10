"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";

export default function PokemonCard ({ pokemon, isCorrect }) {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null); 

  // useEffect(()=>{
  //   const fetchAudio = async () => {
  //     try {
  //       const response = await fetch();
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       if(audioRef.current) {
  //         audioRef.current.src = url;
  //       }
  //     } catch (error) {
  //       console.log('Failed to fetch audio:', error);
  //     }
  //   };

  //   fetchAudio();
  // },[])

// use useEffect when pokemon value changes from the props
  useEffect(() => {
    try {
      console.log(pokemon);
      const fetchData = async () => {
        if (!pokemon) return;
        const result = await axios.get(pokemon?.url);
        setData(result.data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [pokemon]); //Pass pokemon into the dependancy array


  return (
    <div className="card">
      {loading ? (
        <img src="/pokeball_black.png" className=" opacity-[50%] animate-spin max-w-[40px] max-h-[40px]"/>
      ) :
      (<><img
        src={data?.sprites?.other?.showdown?.front_default}
        alt={"guess who?"}
        className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
        style={{
          marginTop: "50px"
        }}
      />
        <p className="mt-5">Ability: {data?.abilities[0]?.ability?.name}</p>
        <AudioPlayer url={data?.cries?.latest}/>
      </>)}
    </div>
  );
};