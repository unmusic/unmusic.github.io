export const printTime = (time) => {
  if (!time) {
    return "0:0";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const x = minutes < 10 ? "0" + minutes : minutes;
  const y = seconds < 10 ? "0" + seconds : seconds;
  return `${x}:${y}`;
};
