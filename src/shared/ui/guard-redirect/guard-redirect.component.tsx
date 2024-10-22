import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface GuardRedirectProps {
  guard(): string | undefined;
}

export const GuardRedirect = ({ children, guard }: PropsWithChildren<GuardRedirectProps>) => {
  const history = useHistory();

  useEffect(() => {
    const url = guard();

    if (url) {
      history.push(url);
    }
  }, [guard, history]);

  return children;
};
