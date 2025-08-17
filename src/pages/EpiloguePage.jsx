import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyPlayer from '../components/SpotifyPlayer';

function EpiloguePage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

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

export default EpiloguePage;