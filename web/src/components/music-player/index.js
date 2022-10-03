import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { logEvent } from "@amplitude/analytics-browser";
import {
  PlayerStateContext,
  PlayerDispatchContext,
  setCurrentTrack,
} from "../../contexts/Player";
import AMPLITUDE_EVENTS from "../../constants/amplitude-events";
import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";
import NextIcon from "../../assets/images/play-next.svg";
import PrevIcon from "../../assets/images/play-prev.svg";
import "./index.css";

const printTime = (time) => {
  if (!time) {
    return "0:0";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const x = minutes < 10 ? "0" + minutes : minutes;
  const y = seconds < 10 ? "0" + seconds : seconds;
  return `${x}:${y}`;
};

const MusicPlayer = () => {
  const dispatch = useContext(PlayerDispatchContext);
  const { currentTrack, tracks } = useContext(PlayerStateContext);

  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { fileUrl } = tracks?.[trackIndex] || {};

  // Refs
  const audioRef = useRef(new Audio(fileUrl));
  const intervalRef = useRef();
  const isReady = useRef();

  // Destructure for conciseness
  const { isPlaying: isCurrentlyPlaying } = currentTrack || {};
  const { duration } = audioRef.current;
  const start = printTime(trackProgress);
  const end = printTime(duration);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
    logEvent(AMPLITUDE_EVENTS.PLAYER_SLIDER_CHANGE);
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    logEvent(AMPLITUDE_EVENTS.PLAYER_PREVIOUS_CLICK);
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    logEvent(AMPLITUDE_EVENTS.PLAYER_NEXT_CLICK);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      // togglePlaying(dispatch, true);
      startTimer();
    } else {
      audioRef.current.pause();
      // togglePlaying(dispatch, false);
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    setIsPlaying(false);
    audioRef.current = new Audio(fileUrl);
    setTrackProgress(audioRef.current.currentTime);
    const currentTrack = tracks[trackIndex];
    setCurrentTrack(dispatch, currentTrack);
    // if (isPlaying) {
    //   setIsPlaying(true);
    //   startTimer();
    // }

    // if (isReady.current) {
    //   audioRef.current.play();
    //   console.log("START");
    //   setIsPlaying(true);
    //   console.log("END");
    //   startTimer();
    // } else {
    //   // Set the isReady ref as true for the next pass
    //   isReady.current = true;
    // }
  }, [trackIndex]);

  useEffect(() => {
    if (fileUrl) {
      audioRef.current.pause();
      audioRef.current = new Audio(fileUrl);
      setTrackProgress(audioRef.current.currentTime);
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [fileUrl]);

  useEffect(() => {
    setIsPlaying(isCurrentlyPlaying);
  }, [isCurrentlyPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleUserKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;
      if (keyCode === 32) {
        if (isPlaying) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className="music-player-container">
      <div className="music-player">
        <div className="track-info">
          <div className="timeline">
            <div className="time-track">
              <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="progress"
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
                // style={{ background: trackStyling }}
              />
            </div>
            <div className="time-elapsed">
              <span className="time start">{start}</span>
              <p className="track-meta">{currentTrack.name}</p>
              <span className="time end">{end}</span>
            </div>
          </div>

          <div className="controls">
            <button className="control-prev" onClick={() => toPrevTrack()}>
              <img src={PrevIcon} alt="Previous" />
            </button>
            {isPlaying ? (
              <button
                className="control-current"
                onClick={() => {
                  setIsPlaying(false);
                  const trackInfo = { ...currentTrack, isPlaying: false };
                  setCurrentTrack(dispatch, trackInfo);
                  logEvent(AMPLITUDE_EVENTS.PLAYER_PLAY_CLICK, {
                    isPlaying: false,
                  });
                }}
              >
                <img src={PauseIcon} alt="Pause" />
              </button>
            ) : (
              <button
                className="control-current"
                onClick={() => {
                  setIsPlaying(true);
                  const trackInfo = { ...currentTrack, isPlaying: true };
                  setCurrentTrack(dispatch, trackInfo);
                  logEvent(AMPLITUDE_EVENTS.PLAYER_PLAY_CLICK, {
                    isPlaying: true,
                  });
                }}
              >
                <img src={PlayIcon} alt="Pause" />
              </button>
            )}
            <button className="control-next" onClick={() => toNextTrack()}>
              <img src={NextIcon} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
