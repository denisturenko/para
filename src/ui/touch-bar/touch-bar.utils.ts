export const calculateTouching = (el: HTMLElement, el2: HTMLElement, event) => {
  const height = el.offsetHeight; /* - el.offsetTop*/
  const currentTouch = [...event.changedTouches].find((item) => {
    return item.target === el || item.target === el2;
  });
  let tmp = Math.floor(currentTouch.pageY); /*- el.offsetTop*/
  if (tmp < 0) tmp = 0;
  if (tmp > height) tmp = height;

  return ((tmp / height) * 100).toFixed(0);
};
