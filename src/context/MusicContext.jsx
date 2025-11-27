import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";

export const MusicContext = createContext(null);

const tracks = [
  {
    id: 1,
    title: "Quiet Morning",
    artist: "Study Lofi",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
  {
    id: 2,
    title: "Peaceful Rain",
    artist: "Chill Beats",
    url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
  },
  {
    id: 3,
    title: "Soft Focus",
    artist: "Study Session",
    url: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3",
  },
  {
    id: 4,
    title: "Calm Thoughts",
    artist: "Lofi Dreams",
    url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
  },
  {
    id: 5,
    title: "Study Atmosphere",
    artist: "Ambient Lofi",
    url: "https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3",
  },
  {
    id: 6,
    title: "Gentle Waves",
    artist: "Chill Vibes",
    url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
  },
  {
    id: 7,
    title: "Late Night Study",
    artist: "Midnight Lofi",
    url: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
  },
  {
    id: 8,
    title: "Dreamy Clouds",
    artist: "Study Beats",
    url: "https://www.bensound.com/bensound-music/bensound-inspired.mp3",
  },
  {
    id: 9,
    title: "Cozy Corner",
    artist: "Lofi Chill",
    url: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
  },
  {
    id: 10,
    title: "Tranquil Mind",
    artist: "Focus Music",
    url: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
  },
  {
    id: 11,
    title: "Silent Library",
    artist: "Study Lofi",
    url: "https://www.bensound.com/bensound-music/bensound-cute.mp3",
  },
  {
    id: 12,
    title: "Soft Whispers",
    artist: "Calm Beats",
    url: "https://www.bensound.com/bensound-music/bensound-november.mp3",
  },
  {
    id: 13,
    title: "Moonlight Study",
    artist: "Night Lofi",
    url: "https://www.bensound.com/bensound-music/bensound-clearday.mp3",
  },
  {
    id: 14,
    title: "Rainy Window",
    artist: "Ambient Study",
    url: "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
  },
  {
    id: 15,
    title: "Deep Concentration",
    artist: "Focus Beats",
    url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
  },
  {
    id: 16,
    title: "Evening Breeze",
    artist: "Lofi Relax",
    url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
  },
];

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, handleNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying((p) => !p);
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (val) => {
    setVolume(Number(val));
    setIsMuted(false);
  };

  const toggleMute = () => setIsMuted((m) => !m);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        volume,
        isMuted,
        togglePlay,
        handleNext,
        handlePrevious,
        handleSeek,
        handleVolumeChange,
        toggleMute,
        formatTime,
        setCurrentTrack,
        setIsPlaying,
        tracks,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

/**
 * Custom hook to access the Music context
 * @returns {Object} Music context value
 */
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
}
