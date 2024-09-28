import useChangedProps from 'use-changed-props';
import { isEmpty, omit } from 'lodash';

export const useListenChangedProps = (props: unknown) => {
  const listenProps = omit(props, ['children']);

  const res = useChangedProps(listenProps, { log: false });

  console.log('***', isEmpty(res) ? 'No changed props' : res);
};
