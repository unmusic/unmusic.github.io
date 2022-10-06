import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { logEvent } from "@amplitude/analytics-browser";
import {
  PlayerStateContext,
  PlayerDispatchContext,
  setCurrentTrack,
  setPlaying,
  setLoading,
} from "../../contexts/Player";
import { printTime } from "../../utils/player";
import AMPLITUDE_EVENTS from "../../constants/amplitude-events";
import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";
import NextIcon from "../../assets/images/play-next.svg";
import PrevIcon from "../../assets/images/play-prev.svg";
import AudioSpinner from "../../assets/images/audio-spinner.svg";
import LoadingSpinner from "../../assets/images/loading-spinner.svg";
import "./index.css";

const MusicPlayer = () => {
  const dispatch = useContext(PlayerDispatchContext);
  const { currentTrack, tracks } = useContext(PlayerStateContext);

  // State
  const [trackProgress, setTrackProgress] = useState(0);

  // Destructure for conciseness
  const { trackIndex, isPlaying, fileUrl, isLoading } = currentTrack;

  // Refs
  const audioRef = useRef(new Audio(fileUrl));
  const intervalRef = useRef();

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const start = useMemo(() => printTime(trackProgress), [trackProgress]);
  const end = useMemo(() => printTime(duration), [duration]);
  const isTrackLoading = audioRef.current.readyState <= 2;

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
      setPlaying(dispatch, true);
    }
    startTimer();
    logEvent(AMPLITUDE_EVENTS.PLAYER_SLIDER_CHANGE);
  };

  const toPrevTrack = () => {
    let index = 0;
    if (trackIndex - 1 < 0) {
      index = tracks.length - 1;
    } else {
      index = trackIndex - 1;
    }
    const currentTrack = tracks[index];
    currentTrack.trackIndex = index;
    setCurrentTrack(dispatch, currentTrack);
    logEvent(AMPLITUDE_EVENTS.PLAYER_PREVIOUS_CLICK);
  };

  const toNextTrack = () => {
    let index = 0;
    if (trackIndex < tracks.length - 1) {
      index = trackIndex + 1;
    }
    const currentTrack = tracks[index];
    currentTrack.trackIndex = index;
    setCurrentTrack(dispatch, currentTrack);
    logEvent(AMPLITUDE_EVENTS.PLAYER_NEXT_CLICK);
  };

  const handlePlay = () => {
    setPlaying(dispatch, true);
    logEvent(AMPLITUDE_EVENTS.PLAYER_PLAY_CLICK, {
      isPlaying: true,
    });
  };

  const handlePause = () => {
    setPlaying(dispatch, false);
    logEvent(AMPLITUDE_EVENTS.PLAYER_PLAY_CLICK, {
      isPlaying: false,
    });
  };

  const handleUserKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;
      if (keyCode === 32) {
        if (isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    if (fileUrl) {
      setPlaying(dispatch, false);
      audioRef.current = new Audio(fileUrl);
      setPlaying(dispatch, true);
      startTimer();
    }
  }, [fileUrl]);

  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isTrackLoading) {
      setLoading(dispatch, true);
    } else {
      setLoading(dispatch, false);
    }
  }, [isTrackLoading]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

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
              <button className="control-current" onClick={handlePause}>
                <img src={isLoading ? LoadingSpinner : PauseIcon} alt="Pause" />
              </button>
            ) : (
              <button className="control-current" onClick={handlePlay}>
                <img src={isLoading ? LoadingSpinner : PlayIcon} alt="Pause" />
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
