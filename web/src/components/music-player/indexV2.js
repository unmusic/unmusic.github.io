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
} from "../../contexts/Player";
import { printTime } from "../../utils/player";
import AMPLITUDE_EVENTS from "../../constants/amplitude-events";
import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";
import NextIcon from "../../assets/images/play-next.svg";
import PrevIcon from "../../assets/images/play-prev.svg";
import "./index.css";

const MusicPlayer = () => {
  const dispatch = useContext(PlayerDispatchContext);
  const { currentTrack, tracks } = useContext(PlayerStateContext);

  // State
  const [trackProgress, setTrackProgress] = useState(0);

  // Destructure for conciseness
  // const { fileUrl } = tracks?.[trackIndex] || {};
  const { trackIndex, isPlaying, fileUrl } = currentTrack;
  // const fileUrl = useMemo(() => {
  //   return tracks?.[trackIndex]?.fileUrl;
  // }, [trackIndex, tracks]);

  // Refs
  const audioRef = useRef(new Audio(fileUrl));
  const intervalRef = useRef();
  const isReady = useRef();

  // Destructure for conciseness
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

    console.log("currentTrack", currentTrack, tracks);

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
  // useEffect(() => {
  //   audioRef.current.pause();
  //   setPlaying(dispatch, false);
  //   audioRef.current = new Audio(fileUrl);
  //   setTrackProgress(audioRef.current.currentTime);
  //   const currentTrack = tracks[trackIndex];
  //   setCurrentTrack(dispatch, currentTrack);
  //   // if (isPlaying) {
  //   //   setIsPlaying(true);
  //   //   startTimer();
  //   // }

  //   // if (isReady.current) {
  //   //   audioRef.current.play();
  //   //   console.log("START");
  //   //   setIsPlaying(true);
  //   //   console.log("END");
  //   //   startTimer();
  //   // } else {
  //   //   // Set the isReady ref as true for the next pass
  //   //   isReady.current = true;
  //   // }
  // }, [trackIndex]);

  useEffect(() => {
    if (fileUrl) {
      audioRef.current.pause();
      setPlaying(dispatch, false);
      audioRef.current = new Audio(fileUrl);
      setTrackProgress(audioRef.current.currentTime);
      audioRef.current.play();
      setPlaying(dispatch, true);
    }
  }, [fileUrl]);

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
          setPlaying(dispatch, false);
        } else {
          setPlaying(dispatch, true);
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

  console.log("fileURL", fileUrl);

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
                  setPlaying(dispatch, false);
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
                  setPlaying(dispatch, true);
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
