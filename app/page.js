"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import PokemonCard from '@/components/PokemonCard'

export default function Home() {

  const [pokemon, setPokemon] = useState(null) // Get 100 pokemon
  const [currentPokemon, setCurrentPokemon] = useState(null) // current pokemon
  const [loading, setLoading] = useState(false) // when getting the pokemon
  const [isError, setIsError] = useState(false) // check for errors
  const [score, setScore] = useState(0) // user's score starting at 0
  const [guess, setGuess] = useState('') // user's guess 
  const [isCorrect, setIsCorrect] = useState(false)

  //get pokemon data
  const getPokemon = async() => {
    setLoading(true)

    try {
      const data = await axios.get('./api/pokemon')
      console.log(data)
      setPokemon(data.data)
      setLoading(false)
    } catch(error) {
      console.log(error);
      setIsError(true)
      setLoading(false)
    }
  }

  //get this when page loads
  useEffect(() => {
    getPokemon()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!guess) return;

    if(guess.toLowerCase() === currentPokemon.name) {
      setScore(score + 1);
      setGuess("");
      setIsCorrect(true);

      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();
      },2000);
    } else {
      setGuess("");
    } 
  };
  
  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      console.log(pokemon.results)
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon]);

  if (loading) {
    const statusMessage = loading ? (<img src="/pokeball_black.png" className=" opacity-[50%] animate-spin max-w-[40px] max-h-[40px]"/>) : "Error!";
    return (
      <main className="flex flex-col items-center justify-center py-2 h-screen">
        <h1 className="text-4xl font-bold">{statusMessage}</h1>
      </main>
    );
  }
   

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-3 text-slate-400'>Who's that Pokémon?</h1>
        <h2 className='text-3xl font-bold'>Score: 
          <span className='text-slate-400'> {score}</span>
        </h2>
      </div>
      <PokemonCard pokemon={currentPokemon} isCorrect={isCorrect}/>

      
      {/* Underline Form from Tailwind form components*/}
      <form
        className="w-full max-w-sm"
        onSubmit={handleSubmit}
        style={{ marginTop: "2rem" }}
      >
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none caret-white text-white"
            type="text"
            placeholder="Which Pokemon is this?"
            aria-label="Full name"
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => {
              setGuess("");
              getPokemon();
            }}
          >
            Skip
          </button>
        </div>
      </form>
    </main>
  )
}
