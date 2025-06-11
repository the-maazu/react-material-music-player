const secondsToString = (seconds: number): string => {
  if (seconds < 0 || !Number.isFinite(seconds)) {
    throw new Error(
      "Invalid input: seconds must be a non-negative finite number"
    );
  }

  const minutes = Math.floor(seconds / 60).toString();
  const milliseconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${milliseconds}`;
};

export default secondsToString;
