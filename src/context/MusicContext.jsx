import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

const MusicContext = createContext(null);

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
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c4b8471c.mp3",
  },
  {
    id: 3,
    title: "Soft Focus",
    artist: "Study Session",
    url: "https://cdn.pixabay.com/audio/2022/11/22/audio_9e6757c0e7.mp3",
  },
  {
    id: 4,
    title: "Calm Thoughts",
    artist: "Lofi Dreams",
    url: "https://cdn.pixabay.com/audio/2023/02/28/audio_d0684bc7c0.mp3",
  },
  {
    id: 5,
    title: "Study Atmosphere",
    artist: "Ambient Lofi",
    url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe70c21.mp3",
  },
  {
    id: 6,
    title: "Gentle Waves",
    artist: "Chill Vibes",
    url: "https://cdn.pixabay.com/audio/2022/10/25/audio_730ca8ce8c.mp3",
  },
  {
    id: 7,
    title: "Late Night Study",
    artist: "Midnight Lofi",
    url: "https://cdn.pixabay.com/audio/2023/03/17/audio_c4c23e8b6a.mp3",
  },
  {
    id: 8,
    title: "Dreamy Clouds",
    artist: "Study Beats",
    url: "https://cdn.pixabay.com/audio/2022/09/12/audio_92c0e08240.mp3",
  },
  {
    id: 9,
    title: "Cozy Corner",
    artist: "Lofi Chill",
    url: "https://cdn.pixabay.com/audio/2023/01/11/audio_e5b0c8e8cd.mp3",
  },
  {
    id: 10,
    title: "Tranquil Mind",
    artist: "Focus Music",
    url: "https://cdn.pixabay.com/audio/2022/06/15/audio_2ab0e99e46.mp3",
  },
  {
    id: 11,
    title: "Silent Library",
    artist: "Study Lofi",
    url: "https://cdn.pixabay.com/audio/2023/04/22/audio_8f8c9e2b14.mp3",
  },
  {
    id: 12,
    title: "Soft Whispers",
    artist: "Calm Beats",
    url: "https://cdn.pixabay.com/audio/2022/12/08/audio_4f9c0e8a93.mp3",
  },
  {
    id: 13,
    title: "Moonlight Study",
    artist: "Night Lofi",
    url: "https://cdn.pixabay.com/audio/2023/05/14/audio_6e3b8c9f21.mp3",
  },
  {
    id: 14,
    title: "Rainy Window",
    artist: "Ambient Study",
    url: "https://cdn.pixabay.com/audio/2022/07/19/audio_3d8a4c7e65.mp3",
  },
  {
    id: 15,
    title: "Deep Concentration",
    artist: "Focus Beats",
    url: "https://cdn.pixabay.com/audio/2023/06/03/audio_7b9f2d8c44.mp3",
  },
  {
    id: 16,
    title: "Evening Breeze",
    artist: "Lofi Relax",
    url: "https://cdn.pixabay.com/audio/2022/04/26/audio_2c8f9e3a57.mp3",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

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

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
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

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
