import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePokemon } from '../context/PokemonContext';

const TradeSelectionPage = () => {
  const navigate = useNavigate();
  const { selectedPokemon, replacePokemon } = usePokemon();
  const [tradePokemon, setTradePokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeamPokemon, setSelectedTeamPokemon] = useState(null);
  const [selectedTradePokemon, setSelectedTradePokemon] = useState(null);

  useEffect(() => {
    // Ensure we have exactly 3 Pokemon before allowing trade
    if (!selectedPokemon || selectedPokemon.length !== 3) {
      navigate('/');
      return;
    }
  }, [selectedPokemon, navigate]);

  useEffect(() => {
    const fetchTradePokemon = async () => {
      try {
        const promises = Array(3).fill().map(() => {
          const randomId = Math.floor(Math.random() * 898) + 1;
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        });
        const responses = await Promise.all(promises);
        setTradePokemon(responses.map(response => response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchTradePokemon();
  }, []);

  const handleTeamPokemonSelect = (pokemon) => {
    setSelectedTeamPokemon(pokemon);
  };

  const handleTradePokemonSelect = (pokemon) => {
    setSelectedTradePokemon(pokemon);
  };

  const handleTrade = () => {
    if (selectedTeamPokemon && selectedTradePokemon) {
      replacePokemon(selectedTeamPokemon.id, selectedTradePokemon);
      navigate('/select/4');
    }
  };

  const handleSkip = () => {
    navigate('/select/4');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-2xl">Loading trade options...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Trading Center</h1>
        
        {/* Your Current Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Your Team</h2>
          <div className="grid grid-cols-3 gap-6">
            {selectedPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className={`bg-gray-800 rounded-lg p-6 cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
                  selectedTeamPokemon?.id === pokemon.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => handleTeamPokemonSelect(pokemon)}
              >
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 object-contain mx-auto"
                />
                <h3 className="text-xl font-bold text-white capitalize text-center mt-4">{pokemon.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Available Trade Pokemon */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Available for Trade</h2>
          <div className="grid grid-cols-3 gap-6">
            {tradePokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className={`bg-gray-800 rounded-lg p-6 cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
                  selectedTradePokemon?.id === pokemon.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => handleTradePokemonSelect(pokemon)}
              >
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 object-contain mx-auto"
                />
                <h3 className="text-xl font-bold text-white capitalize text-center mt-4">{pokemon.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleTrade}
            disabled={!selectedTeamPokemon || !selectedTradePokemon}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Trade Pokemon
          </button>
          <button
            onClick={handleSkip}
            className="px-8 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Skip Trading
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeSelectionPage;
