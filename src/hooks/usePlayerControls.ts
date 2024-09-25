import { useEffect, useState } from "react";

export const usePlayerControls = () => {
  const keys = {
    KeyW: "leftUp",
    KeyS: "leftDown",
    KeyO: "rightUp",
    KeyK: "rightDown",
    Space: "space",
  };

  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    leftUp: false,
    leftDown: false,
    rightUp: false,
    rightDown: false,
    space: false,
  });

  const setMovementStatus = (code, status) => {
    setMovement((m) => ({ ...m, [code]: status }));
  };

  useEffect(() => {
    const handleKeyDown = (ev) => {
      setMovementStatus(moveFieldByKey(ev.code), true);
    };

    const handleKeyUp = (ev) => {
      setMovementStatus(moveFieldByKey(ev.code), false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
