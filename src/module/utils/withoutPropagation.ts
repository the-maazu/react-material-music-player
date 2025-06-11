// stop event from propagating
const withoutPropagation = (callback: any, ...args: any[]) => (e: any) => {
  e.stopPropagation();
  callback(...args);
};

export default withoutPropagation;
