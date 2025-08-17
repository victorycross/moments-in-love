import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SpotifyPlayer from '../components/SpotifyPlayer';
import { act1Moments } from '../data/act1-moments';
import { act2Moments } from '../data/act2-moments';
import { act3Moments } from '../data/act3-moments';
import { act4Moments } from '../data/act4-moments';

function ActPage() {
  const { actNumber } = useParams();
  const navigate = useNavigate();
  const actNum = parseInt(actNumber, 10);

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

  if (!actInfo || !moments) {
    return <div>Act not found</div>;
  }

  const getGlobalMomentNumber = (momentId, actNumber = actNum) => {
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

  const navigateToMoment = (momentId) => {
    const globalMomentNumber = getGlobalMomentNumber(momentId);
    navigate(`/moment/${actNum}/${globalMomentNumber}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

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
      <SpotifyPlayer currentAct={actNum} />
    </div>
  );
}

export default ActPage;