import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePokemon } from '../context/PokemonContext';
import championCynthia from '../assets/champion-cynthia.png';

const CYNTHIA_POKEMON = [
  'garchomp',
  'spiritomb',
  'roserade',
  'gastrodon',
  'lucario',
  'milotic'
];

const FinalTeamPage = () => {
  const navigate = useNavigate();
  const { selectedPokemon } = usePokemon();
  const [cynthiaTeam, setCynthiaTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there's no selected Pokemon or the team is not complete, redirect to home
    if (!selectedPokemon || selectedPokemon.length < 6) {
      navigate('/');
    }
  }, [selectedPokemon, navigate]);

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

  const handleStartOver = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-2xl">Preparing for the championship battle...</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      backgroundColor: '#111827',
      padding: '2rem 0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '32px',
          textAlign: 'center',
          width: '100%'
        }}>Championship Battle</h1>

        {/* Champion Section */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '16px'
          }}>
            <img
              src={championCynthia}
              alt="Champion Cynthia"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain'
              }}
            />
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginTop: '16px'
            }}>Champion Cynthia</h2>
            <p style={{
              fontSize: '1.5rem',
              color: '#D1D5DB',
              marginTop: '8px'
            }}>The Sinnoh League Champion</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            width: '100%',
            justifyItems: 'center',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            {cynthiaTeam.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'contain',
                    margin: '0 auto'
                  }}
                />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  margin: '0'
                }}>
                  {pokemon.name}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-full text-white text-sm capitalize"
                      style={{
                        backgroundColor: getTypeColor(type.type.name),
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Section */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px'
            }}>Your Team</h2>
            <p style={{
              fontSize: '1.5rem',
              color: '#D1D5DB'
            }}>Ready for Battle!</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            width: '100%',
            justifyItems: 'center',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            {selectedPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-gray-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'contain',
                    margin: '0 auto'
                  }}
                />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  margin: '0'
                }}>
                  {pokemon.name}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-full text-white text-sm capitalize"
                      style={{
                        backgroundColor: getTypeColor(type.type.name),
                      }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartOver}
          style={{
            padding: '16px 32px',
            backgroundColor: '#DC2626',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            fontSize: '1.25rem',
            transition: 'background-color 0.2s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#B91C1C'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#DC2626'}
        >
          Start New Challenge
        </button>
      </div>
    </div>
  );
};

const getTypeColor = (type) => {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  return colors[type] || '#777777';
};

export default FinalTeamPage;
