import { useCallback, useState } from 'react';

export const useOneTimeCall = cb => {
  const [flg, setFlg] = useState(false);

  const call = useCallback(() => {
    !flg && cb();
    setFlg(true);
  }, [cb, flg]);
  const reset = useCallback(() => {
    setFlg(false);
  }, []);

  return [call, reset];
};
