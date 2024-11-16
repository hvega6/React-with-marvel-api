const PokemonCard = ({ pokemon }) => {
  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-400',
      water: 'bg-blue-400',
      electric: 'bg-yellow-400',
      grass: 'bg-green-400',
      ice: 'bg-cyan-400',
      fighting: 'bg-orange-400',
      poison: 'bg-purple-400',
      ground: 'bg-orange-300',
      flying: 'bg-blue-300',
      psychic: 'bg-pink-400',
      bug: 'bg-green-300',
      rock: 'bg-orange-200',
      ghost: 'bg-purple-300',
      dragon: 'bg-purple-500',
      dark: 'bg-gray-600',
      steel: 'bg-gray-300',
      fairy: 'bg-pink-300',
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform duration-200">
      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <h2 className="text-xl font-bold capitalize mt-2">
          {pokemon.name}
        </h2>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`${getTypeColor(type.type.name)} px-2 py-1 rounded text-white text-sm capitalize`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <p className="mt-2 text-gray-600">#{String(pokemon.id).padStart(3, '0')}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
