import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePlayerControls = () => {
  const keys = useMemo(
    () => ({
      KeyW: 'leftUp',
      KeyS: 'leftDown',
      KeyO: 'rightUp',
      KeyK: 'rightDown',
      Space: 'space',
    }),
    []
  );

  const moveFieldByKey = useCallback((key: string) => keys[key as keyof typeof keys], [keys]);

  const [movement, setMovement] = useState({
    leftUp: false,
    leftDown: false,
    rightUp: false,
    rightDown: false,
    space: false,
  });

  const setMovementStatus = (code: string, status: boolean) => {
    setMovement(m => ({ ...m, [code]: status }));
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      setMovementStatus(moveFieldByKey(ev.code), true);
    };

    const handleKeyUp = (ev: KeyboardEvent) => {
      setMovementStatus(moveFieldByKey(ev.code), false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveFieldByKey]);

  return movement;
};
