import axios from "axios";
import { NextResponse } from "next/server";

const getRandomPokemon = async () => {
  try {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    return data;
  } catch(error) {
    return error;
  }
}

// Call the function
export async function GET() {
  try {
    const pokemon = getRandomPokemon();
    return NextResponse.json(pokemon.data);
  } catch(error) {
    return NextResponse.json(500, error);
  }
}