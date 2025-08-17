import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyPlayer from '../components/SpotifyPlayer';

function HomePage() {
  const navigate = useNavigate();

  const act1Info = {
    title: "Beginnings in Small Moments",
    description: "The tentative steps of connection. Shared coffees, small gestures, and early sparks that hint at something deeper.",
    song: "Moments in Love",
    artist: "The Art of Noise",
    momentCount: 30
  };

  const act2Info = {
    title: "Distance and Return",
    description: "Support through struggles and loss. Vulnerability surfaces, trust builds in silence, and affection starts to carry weight.",
    song: "Thinking of You",
    artist: "Sister Sledge",
    momentCount: 30
  };

  const act3Info = {
    title: "Crossing the Line",
    description: "From unspoken want to intimacy. First kisses and the choice to step into love fully.",
    song: "Walls Come Tumbling Down",
    artist: "The Style Council",
    momentCount: 30
  };

  const act4Info = {
    title: "Love Without Distance",
    description: "Passion, reconciliation, and permanence. The joy and strain of being together are tested, until they choose each other openly and fully.",
    song: "Only You",
    artist: "Yazoo",
    momentCount: 30
  };

  const navigateToAct = (actNumber) => {
    navigate(`/act/${actNumber}`);
  };

  const navigateToEpilogue = () => {
    navigate('/epilogue');
  };

  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-image-container">
          <img 
            src="./images/reference_image.png" 
            alt="Closer Than Before - A Fictional Tale of Love Emerging from Friendship" 
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <h1 className="main-title">Closer Than Before</h1>
          <p className="subtitle">A Fictional Tale of Love Emerging from Friendship</p>
          <p className="story-description">
            In moments both tender and unspoken, two friends find themselves changed forever.
          </p>
        </div>
      </div>

      <div className="acts-overview">
        <h2 className="acts-title">The Complete Story</h2>
        <p className="acts-description">
          Experience their love story across four acts, each with its own soundtrack and emotional journey.
        </p>

        <div className="acts-grid">
          <div className="act-card available" onClick={() => navigateToAct(1)}>
            <div className="act-card-header">
              <h3 className="act-card-title">Act I</h3>
              <p className="act-card-subtitle">Beginnings in Small Moments</p>
            </div>
            <div className="act-card-content">
              <p className="act-card-theme">{act1Info.theme}</p>
              <p className="act-card-moments">{act1Info.momentCount} moments</p>
              <div className="act-card-music">
                <span className="music-note">♪</span>
                <span>Moments in Love - The Art of Noise</span>
              </div>
            </div>
            <button className="act-card-button">Enter Act I</button>
          </div>

          <div className="act-card available" onClick={() => navigateToAct(2)}>
            <div className="act-card-header">
              <h3 className="act-card-title">Act II</h3>
              <p className="act-card-subtitle">Distance and Return</p>
            </div>
            <div className="act-card-content">
              <p className="act-card-theme">{act2Info.theme}</p>
              <p className="act-card-moments">{act2Info.momentCount} moments</p>
              <div className="act-card-music">
                <span className="music-note">♪</span>
                <span>Thinking of You - Sister Sledge</span>
              </div>
            </div>
            <button className="act-card-button">Enter Act II</button>
          </div>

          <div className="act-card available" onClick={() => navigateToAct(3)}>
            <div className="act-card-header">
              <h3 className="act-card-title">Act III</h3>
              <p className="act-card-subtitle">Crossing the Line</p>
            </div>
            <div className="act-card-content">
              <p className="act-card-moments">30 moments</p>
              <div className="act-card-music">
                <span className="music-note">♪</span>
                <span>Walls Come Tumbling Down - The Style Council</span>
              </div>
            </div>
            <button className="act-card-button">Enter Act III</button>
          </div>

          <div className="act-card available" onClick={() => navigateToAct(4)}>
            <div className="act-card-header">
              <h3 className="act-card-title">Act IV</h3>
              <p className="act-card-subtitle">Love Without Distance</p>
            </div>
            <div className="act-card-content">
              <p className="act-card-moments">30 moments</p>
              <div className="act-card-music">
                <span className="music-note">♪</span>
                <span>Only You - Yazoo</span>
              </div>
            </div>
            <button className="act-card-button">Enter Act IV</button>
          </div>
        </div>

        <div className="epilogue-section">
          <div className="epilogue-card" onClick={navigateToEpilogue}>
            <div className="epilogue-card-header">
              <h3 className="epilogue-card-title">Epilogue</h3>
              <p className="epilogue-card-subtitle">Morning Light</p>
            </div>
            <div className="epilogue-card-content">
            </div>
            <button className="epilogue-card-button">Read Epilogue</button>
          </div>
        </div>
      </div>

      <div className="homepage-footer">
        <div className="footer-divider">⸻</div>
        <p className="footer-disclaimer">
          This is a work of fiction. Any resemblance to actual persons, living or dead, is purely coincidental.
        </p>
      </div>

      <SpotifyPlayer currentAct={1} />
    </div>
  );
}

export default HomePage;