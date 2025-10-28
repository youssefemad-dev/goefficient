import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useMusic } from "../context/MusicContext";

export default function MusicPlayer() {
  const {
    audioRef,
    isPlaying,
    currentTrack,
    volume,
    isMuted,
    togglePlay,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    toggleMute,
    tracks,
  } = useMusic();

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <>
      {/* Toggle button (always visible) */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Show music player" : "Hide music player"}
        style={{
          position: "fixed",
          right: 16,
          bottom: collapsed ? 6 : 6,
          zIndex: 1060,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#0d6efd",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
      >
        {collapsed ? "▲" : "▼"}
      </button>

      <div
        className="fixed-bottom w-100 bg-white shadow-sm"
        style={{
          transform: collapsed ? "translateY(100%)" : "translateY(0)",
          transition: "transform 240ms ease",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          zIndex: 1050,
        }}
      >
        <div
          className="d-flex align-items-center justify-content-between h-100 container"
          style={{ height: 64 }}
        >
          <div
            className="d-flex align-items-center"
            style={{ minWidth: 0, cursor: "pointer" }}
            title="Player"
          >
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <strong style={{ fontSize: "0.95rem" }}>
                {tracks[currentTrack].title}
              </strong>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                {tracks[currentTrack].artist}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-caret-left-fill"
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
            <button
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
              onClick={togglePlay}
              style={{ width: "48px", height: "48px", padding: 0 }}
            >
              {isPlaying ? (
                <FaPause size={20} />
              ) : (
                <FaPlay size={20} style={{ marginLeft: "2px" }} />
              )}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            </button>
          </div>

          <div className="d-flex align-items-center" style={{ minWidth: 120 }}>
            <button className="btn  btn-sm me-2" onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <FaVolumeMute size={19} />
              ) : (
                <FaVolumeUp size={19} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(e.target.value)}
              style={{ width: 100 }}
            />
          </div>

          <audio ref={audioRef} src={tracks[currentTrack].url}></audio>
        </div>
      </div>
    </>
  );
}
