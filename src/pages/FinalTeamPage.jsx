import { useNavigate } from 'react-router-dom';

const FinalTeamPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Your Champion Team</h2>
        <p className="text-xl text-gray-300 mb-8">
          Here's your final team to challenge Champion Cynthia!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* This would be populated with the user's final team */}
        {/* You'll need to pass the final selected Pokemon from previous steps */}
      </div>

      <div className="text-center space-y-4">
        <p className="text-2xl text-white mb-6">
          Are you ready to challenge Champion Cynthia?
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Over
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Begin Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalTeamPage;
