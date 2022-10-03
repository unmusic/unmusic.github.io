import React, { useReducer, createContext } from "react";

const initialState = {
  tracks: [],
  showPlayer: false,
  currentTrack: null,
};

const ACTION_TYPES = {
  SET_TRACKS: "SET_TRACKS",
  TOGGLE_SHOW_PLAYER: "TOGGLE_SHOW_PLAYER",
  SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
};

export const PlayerStateContext = createContext();
export const PlayerDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TRACKS:
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload.tracks],
        showPlayer: true,
        currentTrack: {
          ...action.payload.tracks?.[0],
          isPlaying: true,
        },
      };
    case ACTION_TYPES.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: {
          ...action.payload.track,
          isPlaying: true,
        },
      };
    case ACTION_TYPES.TOGGLE_SHOW_PLAYER:
      return {
        ...state,
        showPlayer: action.payload.showPlayer,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PlayerDispatchContext.Provider value={dispatch}>
      <PlayerStateContext.Provider value={state}>
        {children}
      </PlayerStateContext.Provider>
    </PlayerDispatchContext.Provider>
  );
};

export const toggleShowPlayer = (dispatch, showPlayer) => {
  return dispatch({
    type: ACTION_TYPES.TOGGLE_SHOW_PLAYER,
    payload: { showPlayer },
  });
};

export const setTracks = (dispatch, tracks) => {
  return dispatch({
    type: ACTION_TYPES.SET_TRACKS,
    payload: { tracks },
  });
};

export const setCurrentTrack = (dispatch, track) => {
  return dispatch({
    type: ACTION_TYPES.SET_CURRENT_TRACK,
    payload: { track },
  });
};

export default PlayerProvider;
