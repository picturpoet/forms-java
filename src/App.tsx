import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AprPage } from './pages/AprPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apr" element={<AprPage />} />
      </Routes>
    </Router>
  );
}

export default App;
