import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpotifyPlayer from '../components/SpotifyPlayer';
import { act1Moments } from '../data/act1-moments';
import { act2Moments } from '../data/act2-moments';
import { act3Moments } from '../data/act3-moments';
import { act4Moments } from '../data/act4-moments';

function MomentPage() {
  const { actNumber, momentNumber } = useParams();
  const navigate = useNavigate();
  const actNum = parseInt(actNumber, 10);
  const momentNum = parseInt(momentNumber, 10);

  const actInfos = {
    1: {
      title: "Beginnings in Small Moments",
      description: "The tentative steps of connection. Shared coffees, small gestures, and early sparks that hint at something deeper.",
      song: "Moments in Love",
      artist: "The Art of Noise",
      momentCount: 30
    },
    2: {
      title: "Distance and Return",
      description: "Support through struggles and loss. Vulnerability surfaces, trust builds in silence, and affection starts to carry weight.",
      song: "Thinking of You",
      artist: "Sister Sledge",
      momentCount: 30
    },
    3: {
      title: "Crossing the Line",
      description: "From unspoken want to intimacy. First kisses and the choice to step into love fully.",
      song: "Walls Come Tumbling Down",
      artist: "The Style Council",
      momentCount: 30
    },
    4: {
      title: "Love Without Distance",
      description: "Passion, reconciliation, and permanence. The joy and strain of being together are tested, until they choose each other openly and fully.",
      song: "Only You",
      artist: "Yazoo",
      momentCount: 30
    }
  };

  const actMoments = {
    1: act1Moments,
    2: act2Moments,
    3: act3Moments,
    4: act4Moments
  };

  const actInfo = actInfos[actNum];
  const moments = actMoments[actNum];

  // Find the moment based on global moment number
  const getMomentFromGlobalNumber = (globalNumber) => {
    const actNumber = Math.ceil(globalNumber / 30);
    const localIndex = ((globalNumber - 1) % 30);
    const actMomentsData = actMoments[actNumber];
    return actMomentsData ? actMomentsData[localIndex] : null;
  };

  const currentMoment = getMomentFromGlobalNumber(momentNum);

  const navigateNext = () => {
    if (momentNum < 120) {
      const nextMomentNum = momentNum + 1;
      const nextActNum = Math.ceil(nextMomentNum / 30);
      navigate(`/moment/${nextActNum}/${nextMomentNum}`);
    }
  };

  const navigatePrevious = () => {
    if (momentNum > 1) {
      const prevMomentNum = momentNum - 1;
      const prevActNum = Math.ceil(prevMomentNum / 30);
      navigate(`/moment/${prevActNum}/${prevMomentNum}`);
    }
  };

  const navigateToActPage = () => {
    navigate(`/act/${actNum}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        navigatePrevious();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'Escape') {
        navigateToActPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [momentNum, actNum, navigate]);

  if (!actInfo || !moments || !currentMoment) {
    return <div>Moment not found</div>;
  }

  return (
    <div className="app">
      <div className="moment-page">
        <div className="moment-header">
          <button 
            onClick={navigateToActPage} 
            className="nav-button home-button"
          >
            ← Back to {actInfo.title}
          </button>
          <div className="moment-progress">
            Moment {momentNum} of 120 • {actInfo.title}
          </div>
        </div>

        <div className="moment-content">
          <div className="moment-image-container">
            <img 
              src={`./images/${currentMoment.image}`} 
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
            disabled={momentNum === 1}
          >
            ← Previous
          </button>
          <button 
            onClick={navigateNext} 
            className="nav-button"
            disabled={momentNum === 120}
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
      <SpotifyPlayer currentAct={actNum} />
    </div>
  );
}

export default MomentPage;