import { useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const SpotifyPlayer = ({ currentAct = 1 }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPlayer, setShowPlayer] = useState(true)

  // Track configurations for different acts
  const actTracks = {
    1: {
      title: "Moments in Love",
      artist: "The Art of Noise",
      embedUrl: "https://open.spotify.com/embed/track/594cjM6hF23kDpqY9Jm5SF?utm_source=generator&theme=0",
      description: "Perfect soundtrack for Brian & Rose's early moments"
    },
    2: {
      title: "Thinking of You",
      artist: "Sister Sledge",
      embedUrl: "https://open.spotify.com/embed/track/6JQm8OkOeUoXkBaZNd0aGZ?utm_source=generator&theme=0",
      description: "The perfect song for their journey through distance and return"
    }
  };

  const currentTrack = actTracks[currentAct] || actTracks[1];

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const closePlayer = () => {
    setShowPlayer(false)
  }

  if (!showPlayer) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setShowPlayer(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg"
          title="Show Music Player"
        >
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <Card className="bg-black/90 backdrop-blur-sm border-green-600/50 shadow-xl">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{currentTrack.title}</div>
                <div className="text-white/70 text-xs truncate">{currentTrack.artist}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  onClick={toggleMinimize}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white h-6 w-6 p-0"
                  title="Expand Player"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                <Button
                  onClick={closePlayer}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white h-6 w-6 p-0"
                  title="Close Player"
                >
                  ×
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <Card className="bg-black/90 backdrop-blur-sm border-green-600/50 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Now Playing</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                onClick={toggleMinimize}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white h-6 w-6 p-0"
                title="Minimize Player"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                onClick={closePlayer}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white h-6 w-6 p-0"
                title="Close Player"
              >
                ×
              </Button>
            </div>
          </div>
          
          <div className="mb-3">
            <h4 className="text-white font-semibold text-sm">{currentTrack.title}</h4>
            <p className="text-white/70 text-xs">{currentTrack.artist}</p>
          </div>

          {/* Spotify Embed */}
          <div className="mb-3 rounded-lg overflow-hidden">
            <iframe
              id="spotify-player"
              src={currentTrack.embedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allowTransparency="true"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>

          <div className="text-xs text-white/60 text-center">
            {currentTrack.description}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SpotifyPlayer

