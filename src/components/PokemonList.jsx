import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        console.log('Fetching Pokemon list...');
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const results = response.data.results;
        console.log('Pokemon list:', results);
        
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );
        
        console.log('Pokemon data:', pokemonData);
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
