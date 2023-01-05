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

      <p>
        <span>Try now on </span>
        <a
          href="https://unmusic.app"
          title="Try it now on our official website"
        >
          www.unmusic.app
        </a>
        <span>&nbsp;</span>
        <a
          href="https://github.com/unmusic/unmusic.github.io"
          target="_blank"
          title="Fork it on Github"
        >
          <img src="/media-assets/github.svg" alt="Fork it on Github" />
        </a>
      </p>
    </header>
  );
};

export default Header;
