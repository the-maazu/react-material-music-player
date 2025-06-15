// stop event from propagating
const withoutPropagation =
  <T extends unknown[]>(callback: (...args: T) => void, ...args: T) =>
  (e: React.MouseEvent) => {
    e.stopPropagation();
    callback(...args);
  };

export default withoutPropagation;
