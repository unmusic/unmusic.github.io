import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { logEvent } from "@amplitude/analytics-browser";
import contentfulClient from "../../utils/contentful";
import AMPLITUDE_EVENTS from "../../constants/amplitude-events";
import "./index.css";

const Home = () => {
  const { isLoading, error, data } = useQuery(["playlists"], () =>
    contentfulClient
      .getEntries({
        content_type: "playlist",
      })
      .then((response) => {
        return response;
      })
  );
  const handleClick = (playlistId, playlistName) => {
    logEvent(AMPLITUDE_EVENTS.HOME_PLAYLIST_CLICK, {
      playlistId,
      playlistName,
    });
  };
  return (
    <div className="home">
      <Helmet>
        <title>UnMusic - Productivity music for Developers</title>
        <meta
          name="description"
          content="Stay zen Stay focused with White Noise"
        />
      </Helmet>
      {isLoading && !data && <p>Loading, please wait!</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && data && (
        <ul className="category-list">
          {data?.items?.map((playlist) => {
            const id = playlist?.sys?.id;
            const cover = playlist?.fields?.cover?.fields?.file?.url;
            const name = playlist?.fields?.name;
            return (
              <li key={id}>
                <Link
                  to={`/playlist/${id}`}
                  onClick={() => handleClick(id, name)}
                >
                  <img src={cover} alt={name} />
                  <h4>{name}</h4>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Home;
