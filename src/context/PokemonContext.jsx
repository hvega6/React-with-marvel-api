import { createContext, useContext, useState } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  const addPokemon = (pokemon) => {
    setSelectedPokemon(prev => [...prev, pokemon]);
  };

  const removePokemon = (pokemonId) => {
    setSelectedPokemon(prev => prev.filter(p => p.id !== pokemonId));
  };

  const replacePokemon = (oldPokemonId, newPokemon) => {
    setSelectedPokemon(prev => 
      prev.map(p => p.id === oldPokemonId ? newPokemon : p)
    );
  };

  return (
    <PokemonContext.Provider value={{
      selectedPokemon,
      addPokemon,
      removePokemon,
      replacePokemon,
      setSelectedPokemon,
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

export default PokemonContext;
