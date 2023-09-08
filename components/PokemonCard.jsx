"use client"

import { useEffect, useState } from "react"

export default function PokemonCard ({ pokemon }) {

  const [num, setNum] = useState(2);

  // use useEffect when pokemon value changes from the props
  useEffect(() => {
    try {
      console.log(pokemon);
      const fetchData = async () => {
        const result = await axios.get(pokemon.url)
      }
    } catch (error) {
      
    }
  }, [pokemon]) //Pass pokemon into the dependancy array

  return (
    <div className="card">
      {/* Who's that Pokémon? */}
      <button>{num}</button>
    </div>
  )
}