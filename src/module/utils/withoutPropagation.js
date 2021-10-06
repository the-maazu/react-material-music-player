// stop event from propagating
function withoutPropagation(callback, ...args) {
  return (e) => {
    e.stopPropagation();
    callback(...args);
  };
}

export default withoutPropagation;
