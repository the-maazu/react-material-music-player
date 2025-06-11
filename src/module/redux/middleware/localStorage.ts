import { Middleware } from "@reduxjs/toolkit";

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("playerState", JSON.stringify(getState()));
    return result;
  };
};

export default localStorageMiddleware;
