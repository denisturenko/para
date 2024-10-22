import type { WindSettings } from 'shared/lib/types';
import { getWindByHeight } from '../player.utils';

const data: WindSettings[] = [{ minHeight: 0 }, { minHeight: 100 }, { minHeight: 200 }] as WindSettings[];

describe('getWindByHeight', () => {
  describe('no wind', () => {
    it('should return undefined', () => {
      expect(getWindByHeight([], 0)).toEqual(undefined);
      expect(getWindByHeight([], 50)).toEqual(undefined);
      expect(getWindByHeight([], 99)).toEqual(undefined);
      expect(getWindByHeight([], 100)).toEqual(undefined);
      expect(getWindByHeight([], 150)).toEqual(undefined);
      expect(getWindByHeight([], 199)).toEqual(undefined);
    });
  });
  describe('single wind', () => {
    it('should return first item ', () => {
      const specificData = [data[0]];

      expect(getWindByHeight(specificData, 0)).toEqual(data[0]);
      expect(getWindByHeight(specificData, 50)).toEqual(data[0]);
      expect(getWindByHeight(specificData, 99)).toEqual(data[0]);
      expect(getWindByHeight(specificData, 100)).toEqual(data[0]);
      expect(getWindByHeight(specificData, 150)).toEqual(data[0]);
      expect(getWindByHeight(specificData, 199)).toEqual(data[0]);
    });
  });
  describe('several winds', () => {
    it('should return first item ', () => {
      expect(getWindByHeight(data, 0)).toEqual(data[0]);
      expect(getWindByHeight(data, 50)).toEqual(data[0]);
      expect(getWindByHeight(data, 99)).toEqual(data[0]);
    });
    it('should return second item ', () => {
      expect(getWindByHeight(data, 100)).toEqual(data[1]);
      expect(getWindByHeight(data, 150)).toEqual(data[1]);
      expect(getWindByHeight(data, 199)).toEqual(data[1]);
    });
  });
});
