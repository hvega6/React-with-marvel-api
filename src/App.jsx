import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import HomePage from './pages/HomePage';
import SelectionPage from './pages/SelectionPage';
import TradeSelectionPage from './pages/TradeSelectionPage';
import FinalTeamPage from './pages/FinalTeamPage';
import { PokemonProvider } from './context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select/:step" element={<SelectionPage />} />
            <Route path="/trade" element={<TradeSelectionPage />} />
            <Route path="/final-team" element={<FinalTeamPage />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  );
}

export default App;
