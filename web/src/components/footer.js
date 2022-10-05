import { useContext } from "react";
import MusicPlayer from "./music-player/indexV2";
import { PlayerStateContext } from "../contexts/Player";

const Footer = () => {
  const { showPlayer } = useContext(PlayerStateContext);
  if (showPlayer) {
    return (
      <footer className="footer">
        <MusicPlayer />
      </footer>
    );
  }
  return null;
};

export default Footer;
