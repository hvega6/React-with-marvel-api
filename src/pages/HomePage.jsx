import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import championCynthia from '../assets/champion-cynthia.png';

const CYNTHIA_POKEMON = [
  'garchomp',
  'spiritomb',
  'roserade',
  'gastrodon',
  'lucario',
  'milotic'
];

const HomePage = () => {
  const navigate = useNavigate();
  const [cynthiaTeam, setCynthiaTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCynthiaTeam = async () => {
      try {
        const promises = CYNTHIA_POKEMON.map(pokemon =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        );
        const responses = await Promise.all(promises);
        setCynthiaTeam(responses.map(response => response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };

    fetchCynthiaTeam();
  }, []);

  const handleStartChallenge = () => {
    navigate('/select/1');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#111827',
      padding: '2rem 0',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '16px',
          textAlign: 'center',
          width: '100%'
        }}>Pokémon Champion Challenge</h1>

        <p style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          color: '#D1D5DB',
          marginBottom: '32px',
          textAlign: 'center',
          width: '100%',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Can you become the new champion?</p>
        
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <img
              src={championCynthia}
              alt="Champion Cynthia"
              style={{ 
                width: '50%', 
                height: '50%',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            textAlign: 'center',
            width: '100%'
          }}>Champion Cynthia</h2>
        </div>

        <div className="grid !grid-cols-3 gap-6 max-w-[1200px] w-full mx-auto mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cynthiaTeam.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-40 h-40 object-contain mx-auto"
                style={{
                  display: 'block',
                  margin: '0 auto',
                  width: '300px',
                  height: '300px'
                }}
              />
              <h3 className="text-xl font-bold text-white capitalize text-center mt-4" style={{
                textAlign: 'center',
                width: '100%'
              }}>{pokemon.name}</h3>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-white text-sm capitalize ${getTypeColor(type.type.name)}`}
                    style={{
                      display: 'inline-block',
                      margin: '0 4px'
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <button
            onClick={handleStartChallenge}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            style={{
              display: 'inline-block',
              margin: '0 auto'
            }}
          >
            Up for the challenge?
          </button>
        </div>
      </div>
    </div>
  );
};

function getTypeColor(type) {
  const colors = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-600',
    rock: 'bg-yellow-600',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-400'
  };
  return colors[type] || 'bg-gray-500';
}

export default HomePage;
