import { useContext, lazy } from "react";
import { PlayerStateContext } from "../contexts/Player";
const MusicPlayer = lazy(() => import("./music-player/indexV2"));

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
