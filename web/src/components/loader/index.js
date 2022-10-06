import { useContext } from "react";
import { PlayerStateContext } from "../../contexts/Player";
import LoadingSpinner from "../../assets/images/loading-spinner.svg";
import "./index.css";

const Loader = () => {
  const { showPlayer } = useContext(PlayerStateContext);
  const className = showPlayer
    ? "loading-container player-open"
    : "loading-container";
  return (
    <div className={className}>
      <img src={LoadingSpinner} alt="Loading" />
    </div>
  );
};

export default Loader;
