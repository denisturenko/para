export const getColorRGB = (param: number) => {
  let value = param;

  if (value < 0) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }

  const red = Math.round(255 * (value / 100));
  const green = 0;
  const blue = Math.round(255 * (1 - value / 100));

  return `rgb(${red}, ${green}, ${blue})`;
};
