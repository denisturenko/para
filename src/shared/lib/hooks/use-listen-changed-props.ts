import useChangedProps from 'use-changed-props';
import { isEmpty, omit } from 'lodash';

export const useListenChangedProps = (props: unknown, name: string = 'default') => {
  const listenProps = omit(props as Record<string, unknown>, ['children']);

  const res = useChangedProps(listenProps, { log: false });

  console.log(`*** [${name}]`, isEmpty(res) ? 'No changed props' : res);
};
