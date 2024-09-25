import { useEffect, useState } from "react";

interface UseKeyboardControlsParams {
  onLeft: () => void;
  onRight: () => void;
  onDown: () => void;
  onUp: () => void;
}

export const useKeyboardControls = (params: UseKeyboardControlsParams) => {
  const keys = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowDown: "down",
    ArrowUp: "up",
    Space: "jump",
  };

  const moveFieldByKey = (key) => keys[key];

  const [movement, setMovement] = useState({
    left: false,
    right: false,
    down: false,
    up: false,
    jump: false,
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
