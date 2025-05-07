import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MediaPlayerProps {
  videoUrl: string;
  title: string;
  onBack?: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ videoUrl, title, onBack }) => {
  const { isAuthenticated } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Désactiver le clic droit
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Désactiver les raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  return (
    <div className="relative bg-black h-full w-full flex flex-col select-none">
      {/* Video Container */}
      <div className="relative flex-grow flex items-center justify-center bg-gray-900">
        <div className="absolute top-4 left-4 z-10">
          {onBack ? (
            <button 
              onClick={onBack}
              className="flex items-center text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              <ArrowLeft size={20} />
              <span className="ml-1">Retour</span>
            </button>
          ) : (
            <Link 
              to="/" 
              className="flex items-center text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              <ArrowLeft size={20} />
              <span className="ml-1">Retour</span>
            </Link>
          )}
        </div>
        
        {/* Video Placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-center">
            <p className="mb-2 text-gray-400">Lecture vidéo simulée</p>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-4 text-sm text-gray-400">
              {isAuthenticated ? 'Qualité : 1080p HD' : 'Qualité : 720p'}
            </p>
            <p className="mt-2 text-xs text-gray-500">URL: {videoUrl}</p>
          </div>
        </div>
        
        {/* Center Play Button */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full"
          >
            <Play size={30} className="text-white ml-1" />
          </button>
        )}
      </div>
      
      {/* Controls Bar */}
      <div className="bg-gray-900 text-white p-2 px-4">
        <div className="flex items-center mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="flex-grow h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="p-1">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button onClick={toggleMute} className="p-1">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <div className="text-sm text-gray-400">
              {Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')} / 2:00
            </div>
          </div>
          
          <div>
            <button className="p-1">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;