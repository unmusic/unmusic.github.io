import { Link } from "react-router-dom";
import { logEvent } from "@amplitude/analytics-browser";
import AMPLITUDE_EVENTS from "../constants/amplitude-events";
import ImgUnMusicLogo from "../assets/images/unmusic-logo.svg";
const Header = () => {
  const handleClick = () => {
    logEvent(AMPLITUDE_EVENTS.HEADER_HOME_CLICK, {});
  };
  return (
    <header className="header">
      <Link className="logo" to="/" onClick={() => handleClick()}>
        <img src={ImgUnMusicLogo} alt="UnMusic" />
      </Link>
    </header>
  );
};

export default Header;
