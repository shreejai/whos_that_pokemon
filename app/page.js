"use client"
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {

  const [pokemon, setPokemon] = useState(null) // Get 100 pokemon
  const [currentPokemon, setCurrentPokemon] = useState(null) // current pokemon
  const [loading, setLoading] = useState(false) // when getting the pokemon
  const [isError, setIsError] = useState(false) // check for errors
  const [score, setScore] = useState(0) // user's score starting at 0
  const [guess, setGuess] = useState('') // user's guess 
  const [isCorrect, setIsCorrect] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}
