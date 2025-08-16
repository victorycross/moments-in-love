import React, { useState, useEffect } from 'react';
import './App.css';
import SpotifyPlayer from './components/SpotifyPlayer';
import { act1Moments } from './data/act1-moments';
import { act2Moments } from './data/act2-moments';
import { act3Moments } from './data/act3-moments';
import { act4Moments } from './data/act4-moments';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'act1', 'act2', 'act3', 'act4', 'epilogue', 'moment'
  const [currentAct, setCurrentAct] = useState(1);
  const [currentMoment, setCurrentMoment] = useState(null);

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

  const getCurrentActMoments = () => {
    if (currentAct === 1) return act1Moments;
    if (currentAct === 2) return act2Moments;
    if (currentAct === 3) return act3Moments;
    if (currentAct === 4) return act4Moments;
    return act1Moments;
  };

  const getCurrentActInfo = () => {
    if (currentAct === 1) return act1Info;
    if (currentAct === 2) return act2Info;
    if (currentAct === 3) return act3Info;
    if (currentAct === 4) return act4Info;
    return act1Info;
  };

  const getGlobalMomentNumber = (momentId, actNumber = currentAct) => {
    // Act I: moments 1-30, Act II: 31-60, Act III: 61-90, Act IV: 91-120
    const baseNumber = (actNumber - 1) * 30;
    let momentIndex = 0;
    
    if (actNumber === 1) {
      momentIndex = act1Moments.findIndex(m => m.id === momentId);
    } else if (actNumber === 2) {
      momentIndex = act2Moments.findIndex(m => m.id === momentId);
    } else if (actNumber === 3) {
      momentIndex = act3Moments.findIndex(m => m.id === momentId);
    } else if (actNumber === 4) {
      momentIndex = act4Moments.findIndex(m => m.id === momentId);
    }
    
    return baseNumber + momentIndex + 1;
  };

  const navigateToAct = (actNumber) => {
    setCurrentAct(actNumber);
    if (actNumber === 1) setCurrentView('act1');
    else if (actNumber === 2) setCurrentView('act2');
    else if (actNumber === 3) setCurrentView('act3');
    else if (actNumber === 4) setCurrentView('act4');
    setCurrentMoment(null);
  };

  const navigateToMoment = (momentId) => {
    const moments = getCurrentActMoments();
    const moment = moments.find(m => m.id === momentId);
    if (moment) {
      setCurrentMoment(moment);
      setCurrentView('moment');
    }
  };

  const navigateHome = () => {
    setCurrentView('home');
    setCurrentMoment(null);
    setCurrentAct(1);
  };

  const navigateNext = () => {
    if (currentMoment) {
      const moments = getCurrentActMoments();
      const currentIndex = moments.findIndex(m => m.id === currentMoment.id);
      if (currentIndex < moments.length - 1) {
        const nextMoment = moments[currentIndex + 1];
        setCurrentMoment(nextMoment);
      }
    }
  };

  const navigatePrevious = () => {
    if (currentMoment) {
      const moments = getCurrentActMoments();
      const currentIndex = moments.findIndex(m => m.id === currentMoment.id);
      if (currentIndex > 0) {
        const prevMoment = moments[currentIndex - 1];
        setCurrentMoment(prevMoment);
      }
    }
  };

  const getCurrentMomentIndex = () => {
    if (!currentMoment) return 0;
    const moments = getCurrentActMoments();
    return moments.findIndex(m => m.id === currentMoment.id) + 1;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (currentView === 'moment') {
        if (e.key === 'ArrowLeft') {
          navigatePrevious();
        } else if (e.key === 'ArrowRight') {
          navigateNext();
        } else if (e.key === 'Escape') {
          setCurrentView(currentAct === 1 ? 'act1' : 'act2');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentView, currentMoment, currentAct]);

  if (currentView === 'moment' && currentMoment) {
    const moments = getCurrentActMoments();
    const actInfo = getCurrentActInfo();
    
    return (
      <div className="app">
        <div className="moment-page">
          <div className="moment-header">
            <button 
              onClick={() => setCurrentView(currentAct === 1 ? 'act1' : 'act2')} 
              className="nav-button home-button"
            >
              ← Back to {actInfo.title}
            </button>
            <div className="moment-progress">
              Moment {getGlobalMomentNumber(currentMoment.id)} of 120 • {actInfo.title}
            </div>
          </div>

          <div className="moment-content">
            <div className="moment-image-container">
              <img 
                src={`/images/${currentMoment.image}`} 
                alt={currentMoment.title}
                className="moment-image"
              />
            </div>
            
            <div className="moment-text-container">
              <div className="moment-title-section">
                <h1 className="moment-title">{currentMoment.title}</h1>
                <p className="moment-pov">{currentMoment.pov}</p>
              </div>
              
              <div className="moment-content">
                <p className="moment-text">
                  {(currentMoment.text || currentMoment.content).split('\n').map((paragraph, index) => (
                    <span key={index}>
                      {paragraph}
                      {index < (currentMoment.text || currentMoment.content).split('\n').length - 1 && <><br /><br /></>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="moment-navigation">
            <button 
              onClick={navigatePrevious} 
              className="nav-button"
              disabled={getCurrentMomentIndex() === 1}
            >
              ← Previous
            </button>
            <button 
              onClick={navigateNext} 
              className="nav-button"
              disabled={getCurrentMomentIndex() === moments.length}
            >
              Next →
            </button>
          </div>
          
          <div className="moment-footer">
            <button onClick={navigateHome} className="nav-button home-button-footer">
              ← Back to Home
            </button>
          </div>
        </div>
        <SpotifyPlayer currentAct={currentAct} />
      </div>
    );
  }

  if (currentView === 'epilogue') {
    return (
      <div className="app">
        <div className="epilogue-page">
          <div className="epilogue-header">
            <button onClick={navigateHome} className="nav-button home-button">
              ← Home
            </button>
            <h1 className="epilogue-title">Epilogue</h1>
            <p className="epilogue-subtitle">Morning Light</p>
          </div>

          <div className="epilogue-content">
            <div className="epilogue-image-container">
              <img 
                src="/images/reference_image.png" 
                alt="Brian and Rose - Morning Light"
                className="epilogue-image"
              />
            </div>
            
            <div className="epilogue-text-container">
              <div className="epilogue-narrative-section">
                <div className="epilogue-pov-section brian-pov">
                  <h3 className="epilogue-pov-title">Brian's POV</h3>
                  <div className="epilogue-pov-content">
                    <p className="epilogue-text">
                      I woke to her breathing beside me, slow and steady. She stirred and whispered, "Hi."
                    </p>
                    <p className="epilogue-text">
                      "Hi," I said, and felt the weight of everything that word meant.
                    </p>
                  </div>
                </div>

                <div className="epilogue-pov-section rose-pov">
                  <h3 className="epilogue-pov-title">Rose's POV</h3>
                  <div className="epilogue-pov-content">
                    <p className="epilogue-text">
                      I rested my head on his chest. "Still yes?" I teased.
                    </p>
                    <p className="epilogue-text">
                      "Forever yes," he replied.
                    </p>
                    <p className="epilogue-text">
                      We stayed like that for a long time, the world outside waking without us. No phones, no plans — just home.
                    </p>
                  </div>
                </div>
              </div>

              <div className="epilogue-section afterword">
                <h3 className="afterword-title">Afterword from the Author</h3>
                <p className="epilogue-text">
                  Love is not always a lightning strike. Sometimes it's a slow burn that begins in friendship, builds in trust, and transforms into something lasting.
                </p>
                <p className="epilogue-text">
                  Brian and Rose remind us that people can reinvent themselves at any point in life, that it's never too late to rediscover joy or to create love from a bond that began in another form.
                </p>
                <p className="epilogue-text">
                  Friendship can be the foundation, but the choice to build more on it — to risk, to be open, to give — is what makes it endure.
                </p>
              </div>
            </div>
          </div>
          
          <div className="epilogue-footer">
            <button onClick={navigateHome} className="nav-button home-button-footer">
              ← Back to Home
            </button>
          </div>
        </div>
        <SpotifyPlayer currentAct={4} />
      </div>
    );
  }

  if (currentView === 'act1' || currentView === 'act2' || currentView === 'act3' || currentView === 'act4') {
    const actInfo = getCurrentActInfo();
    const moments = getCurrentActMoments();
    
    return (
      <div className="app">
        <div className="act-page">
          <div className="act-header">
            <button onClick={navigateHome} className="nav-button home-button">
              ← Home
            </button>
            <h1 className="act-title">{actInfo.title}</h1>
            <p className="act-theme">{actInfo.theme}</p>
            <p className="act-description">{actInfo.description}</p>
          </div>

          <div className="quick-navigation">
            <button 
              onClick={() => navigateToMoment(moments[0].id)} 
              className="quick-nav-button primary"
            >
              Start Reading from Beginning
            </button>
            {actInfo.pivotalMoment && (
              <button 
                onClick={() => navigateToMoment(actInfo.pivotalMoment.id)} 
                className="quick-nav-button secondary"
              >
                Jump to "{actInfo.pivotalMoment.title}"
              </button>
            )}
          </div>

          <div className="moments-grid">
            {moments.map((moment) => (
              <div 
                key={moment.id} 
                className="moment-card"
                onClick={() => navigateToMoment(moment.id)}
              >
                <div className="moment-card-image">
                  <img 
                    src={`/images/${moment.image}`} 
                    alt={moment.title}
                  />
                </div>
                <div className="moment-card-content">
                  <div className="moment-number">#{getGlobalMomentNumber(moment.id)}</div>
                  <h3 className="moment-card-title">{moment.title}</h3>
                  <p className="moment-card-pov">{moment.pov}</p>
                  <p className="moment-card-preview">
                    {(moment.text || moment.content).substring(0, 120)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="act-footer">
            <div className="progress-info">
              <p><strong>{actInfo.title} Complete:</strong> {actInfo.momentCount} moments</p>
            </div>
            <div className="act-home-button">
              <button onClick={navigateHome} className="nav-button home-button-footer">
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
        <SpotifyPlayer currentAct={currentAct} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-image-container">
          <img 
            src="/images/reference_image.png" 
            alt="More Than Friends - A Fictional Love Story" 
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <h1 className="main-title">More Than Friends</h1>
          <p className="subtitle">A Fictional Story of Connection and Becoming More</p>
          <p className="story-description">
            Follow two characters as they discover how friendship can evolve into something unexpected, 
            captured in tender moments that grow into love. This is a work of fiction. Any resemblance 
            to actual persons, living or dead, is purely coincidental.
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
          <div className="epilogue-card" onClick={() => setCurrentView('epilogue')}>
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

      <SpotifyPlayer currentAct={currentAct} />
    </div>
  );
}

export default App;

