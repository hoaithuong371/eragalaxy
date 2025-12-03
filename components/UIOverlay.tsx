import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AUDIO_URL } from '../constants';

const UIOverlay: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Attempt auto-play on interaction if needed, but manual is safer for browsers
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-end items-end p-6 z-10">
      <audio ref={audioRef} src={AUDIO_URL} />
      
      {/* Only the Audio Toggle Button remains */}
      <button 
        onClick={toggleAudio}
        className="pointer-events-auto bg-black/40 backdrop-blur-md border border-pink-500/30 p-3 rounded-full text-pink-300 hover:text-white hover:bg-pink-500/20 transition-all duration-300 group shadow-[0_0_15px_rgba(255,102,178,0.3)]"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <div className="relative">
              <VolumeX className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default UIOverlay;