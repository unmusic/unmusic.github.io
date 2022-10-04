import { useContext, cloneElement } from "react";
import { PlayerStateContext } from "../contexts/Player";

const Main = ({ children, ...allOtherProps }) => {
  const { showPlayer } = useContext(PlayerStateContext);
  const mainClassName = showPlayer ? "main player-open" : "main";
  return (
    <main className={mainClassName}>
      {cloneElement(children, { ...allOtherProps })}
    </main>
  );
};

export default Main;
