export const mapValueToPercentage = (min: number, max: number, currentValue: number) => {
  if (currentValue < min) {
    return 0;
  }

  if (currentValue > max) {
    return 1;
  }

  const range = max - min;

  return (currentValue - min) / range;
};

export const dynamicValue = (matrix: number[][]) => {
  let startTime: number | null = null;
  let flg = false;

  return function (controlValue: number, value: number, now: number) {
    if (!startTime) {
      startTime = now;
    }

    const elapsedTime = now - startTime;

    const foundIdx = matrix.findIndex((currentItem, idx) => {
      const nextItem = matrix[idx + 1];

      return nextItem && currentItem[0] <= controlValue && nextItem[0] > controlValue;
    });

    if (foundIdx === -1) {
      startTime = null;
      flg = false;

      return controlValue;
    }

    const matrixItem = matrix[foundIdx];

    const tsDelta = 3 * 1000;

    if (elapsedTime < matrixItem[1]) {
      return value;
    } else if (elapsedTime < startTime + matrixItem[1] + tsDelta) {
      /* try {
        mapValueToPercentage(elapsedTime, startTime + matrixItem[1] + tsDelta, now);
      } catch (e) {
        console.log('***', elapsedTime, startTime + matrixItem[1] + tsDelta, now);

        return 0;
      } */

      const percent = mapValueToPercentage(elapsedTime, startTime + matrixItem[1] + tsDelta, now);

      return value + matrixItem[2] * value * percent;
    }

    console.log('***', flg);
    flg = true;

    return value + matrixItem[2] * value;
  };
};
