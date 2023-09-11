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
      setPokemon(data)
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
  
  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      //setCurrentPokemon = (pokemon.results[randomPokemon]);
    }
  }, [pokemon]);


   

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl font-bold'>Who's that Pokémon?</h1>
      <h2 className='text-3xl font-bold'>Score: {score}</h2>
      <PokemonCard pokemon={currentPokemon} isCorrect={isCorrect}/>
    </main>
  )
}
