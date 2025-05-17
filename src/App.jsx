import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import TournamentsPage from './pages/TournamentsPage'; // Placeholder
import RankingsPage from './pages/RankingsPage';     // Placeholder
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Routes>
        {/* Routes with Header and Footer */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </div>
  );
}

// Layout component including Header and Footer for most pages
const MainLayout = () => (
  <>
    {/* Header is not part of login/signup based on original HTML structure of section-1 */}
    {/* We can conditionally render Header based on route or create separate layouts */}
    {/* For now, Header is included on all MainLayout routes */}
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/tournaments" element={<TournamentsPage />} />
      <Route path="/rankings" element={<RankingsPage />} />
      {/* Add other routes here */}
    </Routes>
    <Footer />
  </>
);


export default App;