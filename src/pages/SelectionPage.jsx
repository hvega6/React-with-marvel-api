import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePokemon } from '../context/PokemonContext';
import pokeball from '../assets/pokeball.png';

const SelectionPage = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { addPokemon, selectedPokemon: teamPokemon } = usePokemon();
  const currentStep = parseInt(step);

  useEffect(() => {
    const handleRefresh = () => {
      navigate('/');
    };

    window.addEventListener('beforeunload', handleRefresh);
    return () => window.removeEventListener('beforeunload', handleRefresh);
  }, [navigate]);

  useEffect(() => {
    // Validate step number and team size
    if (isNaN(currentStep) || currentStep < 1 || currentStep > 6) {
      navigate('/');
      return;
    }

    // For steps 4-6, ensure we have first 3 Pokemon
    if (currentStep > 3 && (!teamPokemon || teamPokemon.length < 3)) {
      navigate('/');
      return;
    }

    // For each step, ensure we have the correct number of previous Pokemon
    if (currentStep > 1 && (!teamPokemon || teamPokemon.length < currentStep - 1)) {
      navigate('/');
    }
  }, [currentStep, teamPokemon, navigate]);

  const [revealedPokeball, setRevealedPokeball] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getNumberOfPokeballs = () => {
    return currentStep <= 3 || currentStep >= 6 ? 6 : 3;
  };

  const generateRandomPokemonId = () => Math.floor(Math.random() * 898) + 1;

  const handlePokeballClick = async (index) => {
    if (revealedPokeball !== null || loading || isTransitioning) return;

    setLoading(true);
    setRevealedPokeball(index);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${generateRandomPokemonId()}`);
      setCurrentPokemon(response.data);
      
      // Wait for 2 seconds to show the Pokemon
      setTimeout(() => {
        setIsTransitioning(true);
        addPokemon(response.data);
        
        // Wait another second before navigating
        setTimeout(() => {
          setIsTransitioning(false);
          setRevealedPokeball(null);
          setCurrentPokemon(null);
          setLoading(false);
          
          const nextStep = currentStep + 1;
          if (currentStep === 3) {
            navigate('/trade');
          } else if (currentStep === 6) {
            navigate('/final-team');
          } else {
            navigate(`/select/${nextStep}`);
          }
        }, 1000);
      }, 2000);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
      setRevealedPokeball(null);
      setCurrentPokemon(null);
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    // Reset states when step changes
    setRevealedPokeball(null);
    setCurrentPokemon(null);
    setLoading(false);
    setIsTransitioning(false);
  }, [step]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          {currentStep <= 3 ? `First Selection Round ${currentStep}` :
           currentStep <= 6 ? `Final Selection Round ${currentStep - 3}` :
           'Bonus Selection'}
        </h2>
        <p className="text-xl text-gray-300 mb-4">
          Choose a Pokéball to reveal your Pokémon!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        {Array(getNumberOfPokeballs()).fill().map((_, index) => (
          <div
            key={index}
            className="flex justify-center"
          >
            {revealedPokeball === index && currentPokemon && !isTransitioning ? (
              <div className="transform scale-100 transition-all duration-500">
                <img
                  src={currentPokemon.sprites.other['official-artwork'].front_default}
                  alt={currentPokemon.name}
                  className="w-64 h-64 object-contain"
                />
                <h3 className="text-xl font-bold text-white capitalize text-center mt-4">
                  {currentPokemon.name}
                </h3>
              </div>
            ) : (
              <button
                onClick={() => handlePokeballClick(index)}
                disabled={revealedPokeball !== null || loading || isTransitioning}
                className="transform hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-4"
              >
                <img
                  src={pokeball}
                  alt="Pokeball"
                  className="w-64 h-64 object-contain transform hover:rotate-12 transition-transform duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    WebkitBackgroundClip: 'content-box',
                    backgroundClip: 'content-box'
                  }}
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Selected Pokemon Team */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 p-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Your Selected Pokemon</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {teamPokemon.map((pokemon, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain"
                />
                <p className="text-white text-center capitalize">{pokemon.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
