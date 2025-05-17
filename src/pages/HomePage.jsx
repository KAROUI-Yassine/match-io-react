import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from '../components/Particles';
import TournamentCard from '../components/TournamentCard';
import PlayerCard from '../components/PlayerCard'; // Create this similar to TournamentCard
import StepCard from '../components/StepCard';     // Create this similar to TournamentCard
import NewsCard from '../components/NewsCard';     // Create this similar to TournamentCard
import Button from '../components/Button';
import useTypingEffect from '../hooks/useTypingEffect';

// Placeholder components until you create them
const PlaceholderPlayerCard = ({ rank, avatar, name, game, stats, ...props }) => (
  <div className="player-card" {...props}>
    <div className="rank">{rank}</div><div className="avatar">{avatar}</div>
    <h3>{name}</h3><p className="game">{game}</p><p className="stats">{stats}</p>
  </div>
);
const PlaceholderStepCard = ({ number, title, description, ...props }) => (
  <div className="step" {...props}>
    <div className="step-number">{number}</div><h3>{title}</h3><p>{description}</p>
  </div>
);
const PlaceholderNewsCard = ({ image, title, excerpt, readMoreLink, ...props }) => (
  <div className="featured-news" {...props}>
    <div className="news-image">{image}</div><h3>{title}</h3>
    <p className="excerpt">{excerpt}</p>
    <Link to={readMoreLink} className="read-more">Read More →</Link>
  </div>
);


const HomePage = () => {
  const heroTitleText = "Compete. Win. Dominate.";
  const heroSubtitleText = "The ultimate platform for esports competition";

  const animatedHeroTitle = useTypingEffect(heroTitleText, 100); // Speed from effects.js
  const animatedSubtitle = useTypingEffect(heroSubtitleText, 50, true); // Speed from initTerminalEffect, add cursor

  // Refs for scroll animations (if not handled internally by cards)
  const featuredTournamentsRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const rankingsSectionRef = useRef(null);
  const newsSectionRef = useRef(null);

  // Example data
  const tournaments = [
    { id: 1, title: "Valorant Open", prizePool: "$5,000 Prize Pool", date: "June 15-17, 2025", initialTeams: 128, gameIcon: "🎯" },
    { id: 2, title: "League Clash", prizePool: "$3,000 Prize Pool", date: "June 20-22, 2025", initialTeams: 64, gameIcon: "⚔️" },
    { id: 3, title: "CS:GO Showdown", prizePool: "$7,500 Prize Pool", date: "June 25-28, 2025", initialTeams: 96, gameIcon: "🔫" },
  ];

  const steps = [
    { number: 1, title: "Create Account", description: "Sign up and complete your gaming profile" },
    { number: 2, title: "Join Tournament", description: "Find and register for competitions" },
    { number: 3, title: "Compete", description: "Play matches and climb the brackets" },
    { number: 4, title: "Win Prizes", description: "Earn rewards and climb the leaderboards" },
  ];

  const topPlayers = [
    { rank: 1, avatar: "👑", name: "ProGamer1337", game: "Valorant", stats: "24 Wins | 92% WR" },
    { rank: 2, avatar: "⚡", name: "HeadshotQueen", game: "CS:GO", stats: "18 Wins | 89% WR" },
    { rank: 3, avatar: "💎", name: "MidOrFeed", game: "League of Legends", stats: "15 Wins | 87% WR" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="section hero-section" style={{ position: 'relative' }}>
        <Particles /> {/* Particles will be positioned absolutely within this section */}
        {/* Header is now globally handled by App.jsx layout */}
        <div className="hero-content">
          <h1>{animatedHeroTitle}</h1>
          <p className="subtitle">{animatedSubtitle}</p>
          <div className="cta-buttons">
            <Button className="primary-button">Join Tournament</Button>
            <Button className="secondary-button" isSecondary={true}>How It Works</Button>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="section featured-section" ref={featuredTournamentsRef}>
        <h2 className="section-title">Featured Tournaments</h2>
        <div className="tournament-cards">
          {tournaments.map(tourney => (
            <TournamentCard key={tourney.id} {...tourney} />
          ))}
        </div>
        <div className="view-all">
          <Link to="/tournaments">View All Tournaments →</Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="section steps-section" ref={stepsSectionRef}>
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {steps.map(step => (
            // Replace with actual StepCard component that uses useIntersectionObserver
            <PlaceholderStepCard key={step.number} {...step} />
            // <StepCard key={step.number} number={step.number} title={step.title} description={step.description} />
          ))}
        </div>
      </section>

      {/* Top Players */}
      <section className="section rankings-section" ref={rankingsSectionRef}>
        <h2 className="section-title">Top Players This Month</h2>
        <div className="player-cards">
           {topPlayers.map(player => (
             // Replace with actual PlayerCard component
             <PlaceholderPlayerCard key={player.rank} {...player} />
            // <PlayerCard key={player.rank} rank={player.rank} avatar={player.avatar} name={player.name} game={player.game} stats={player.stats} />
          ))}
        </div>
        <div className="view-all">
          <Link to="/rankings">View Full Rankings →</Link>
        </div>
      </section>

      {/* News & Updates */}
      <section className="section news-section" ref={newsSectionRef}>
        <div className="news-container">
          <div className="news-main">
            <h2 className="section-title">Latest News</h2>
            {/* Replace with actual NewsCard component */}
            <PlaceholderNewsCard
              image="📰"
              title="Summer Championship Series Announced"
              excerpt="Our biggest tournament series yet with over $50,000 in total prizes across multiple games."
              readMoreLink="#"
            />
            {/* <NewsCard ... /> */}
          </div>
          <div className="news-sidebar">
            <h3>Quick Links</h3>
            <ul className="quick-links">
              <li><a href="#">Player Guide</a></li>
              <li><a href="#">Tournament Rules</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Streaming Setup</a></li>
              <li><a href="#">Community Discord</a></li>
            </ul>
          </div>
        </div>
      </section>
      {/* Footer is now globally handled by App.jsx layout */}
    </>
  );
};

export default HomePage;