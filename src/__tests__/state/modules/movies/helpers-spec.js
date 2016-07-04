import { expect } from 'chai'
import { calculateCardDimensions, calculatePagesToLoad } from '../../../../state/modules/movies/helpers';

describe('state / modules / movies / helpers', function () {

  describe('calculateCardDimensions', function() {

    const testCase1 = { containerWidth: 1000, width: 200, height: 100 };
    const testCase2 = { containerWidth: 500, width: 200, height: 100 };
    const testCase3 = { containerWidth: 1368, width: 390, height: 239 };
    const result1 = calculateCardDimensions(testCase1);
    const result2 = calculateCardDimensions(testCase2);
    const result3 = calculateCardDimensions(testCase3);

    it('should correctly calculate number of cards per rows', function () {
      expect(result1.numPerRow).to.equal(5);
      expect(result2.numPerRow).to.equal(3);
      expect(result3.numPerRow).to.equal(4);
    })

    it('should correctly calculate card width', function () {
      expect(result1.itemWidth).to.equal(200);
      expect(result2.itemWidth).to.equal(500/3);
      expect(result3.itemWidth).to.equal(342);
    })

    it('should correctly calculate card height', function () {
      expect(result1.itemHeight).to.equal(100);
      expect(result2.itemHeight).to.equal(100 * ((500/3) / 200));
      expect(result3.itemHeight).to.equal(239 * (342 / 390));
    })

  })

  describe('calculatePagesToLoad', function() {

    const testCase1 = { scrollHeight: 500, scrollPosition: 0, itemHeight: 100, itemsPerPage: 5, totalItems: 20, numPerRow: 1 };
    const testCase2 = { scrollHeight: 768, scrollPosition: 200, itemHeight: 250, itemsPerPage: 20, totalItems: 200, numPerRow: 4 };
    const testCase3 = { scrollHeight: 1500, scrollPosition: 1200, itemHeight: 190, itemsPerPage: 10, totalItems: 20, numPerRow: 5 };
    const testCase4 = { scrollHeight: 1500, scrollPosition: 2500, itemHeight: 190, itemsPerPage: 10, totalItems: 2000, numPerRow: 5 };
    const result1 = calculatePagesToLoad(testCase1);
    const result2 = calculatePagesToLoad(testCase2);
    const result3 = calculatePagesToLoad(testCase3);
    const result4 = calculatePagesToLoad(testCase4);

    it('should correctly calculate pages to load', function () {
      expect(result1).to.deep.equal([1, 2]);
      expect(result2).to.deep.equal([1, 2]);
      expect(result3).to.deep.equal([2]);
      expect(result4).to.deep.equal([5, 6, 7, 8, 9, 10, 11, 12, 13]);
    })

  })

})
