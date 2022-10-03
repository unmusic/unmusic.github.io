import { Helmet } from "react-helmet";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { logEvent } from "@amplitude/analytics-browser";
import {
  setTracks,
  PlayerDispatchContext,
  PlayerStateContext,
} from "../../contexts/Player";
import AMPLITUDE_EVENTS from "../../constants/amplitude-events";
import contentfulClient from "../../utils/contentful";
import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";
import "./index.css";

const PlayList = () => {
  const { playlistId } = useParams();
  const { currentTrack } = useContext(PlayerStateContext);
  const dispatch = useContext(PlayerDispatchContext);

  const { isLoading, error, data } = useQuery([playlistId], () =>
    contentfulClient.getEntry(playlistId).then((response) => {
      return response;
    })
  );

  const handlePlaylist = () => {
    const allTracks = data?.fields?.tracks?.map(({ fields, sys }) => ({
      id: sys.id,
      name: fields?.title,
      fileUrl: fields?.trackURL,
    }));
    const playNow = [...allTracks];
    setTracks(dispatch, playNow);
    logEvent(AMPLITUDE_EVENTS.PLAYLIST_PLAY_CLICK, {
      playlistId,
      playlistName: data?.fields?.name,
    });
  };

  const handleTrackPlay = (trackId, trackName) => {
    logEvent(AMPLITUDE_EVENTS.PLAYLIST_TRACK_PLAY_CLICK, {
      trackId,
      trackName,
      playlistId,
      playlistName: data?.fields?.name,
    });
  };
  return (
    <div className="playlist">
      <Helmet>
        <title>
          {data?.fields?.name ? `${data?.fields?.name} | UnMusic` : "UnMusic"}
        </title>
        <meta name="description" content={data?.fields?.description} />
      </Helmet>
      {isLoading && !data && <p>Loading, please wait...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && data && (
        <>
          <div className="playlist-cover">
            <img src={data?.fields?.cover?.fields?.file?.url} alt="Cover" />
          </div>
          <div className="playlist-header">
            <h1>{data?.fields?.name}</h1>
            <button className="button" onClick={handlePlaylist}>
              <img src={PlayIcon} alt="Play" />
            </button>
          </div>
          <ul>
            {data?.fields?.tracks?.map(({ fields, sys }) => {
              const isCurrentlyPlaying =
                currentTrack?.id === sys?.id && currentTrack?.isPlaying;
              return (
                <li key={sys?.id}>
                  <img
                    className="album-art"
                    src={fields?.albumArt?.fields?.file?.url}
                  />
                  <h4 className="track-name">{fields?.title}</h4>
                  <div className="action">
                    <button
                      className="button"
                      onClick={() => handleTrackPlay(sys?.id, fields?.title)}
                    >
                      <img
                        src={isCurrentlyPlaying ? PauseIcon : PlayIcon}
                        alt="Play"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default PlayList;
