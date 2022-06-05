/**
 * Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive)
 * @param {number} low non-negative integer
 * @param {number} high non-negative integer
 * @returns {number} count of odd numbers between low and high (inclusive)
 * @see https://leetcode.com/problems/count-odd-numbers-in-an-interval-range
 */
const countOdds = (low: number, high: number): number => {
  if (!Number.isInteger(low)) {
    throw new Error('low must be an integer')
  }

  if (low < 0) {
    throw new Error('low must be a non negative integer')
  }

  if (!Number.isInteger(high)) {
    throw new Error('high must be an integer')
  }

  if (high < 0) {
    throw new Error('high must be a non negative integer')
  }

  return Math.floor((high - low) / 2) + (low & 1 || high & 1)
}

if (import.meta.vitest) {
  const {
    vitest: { it, expect },
  } = import.meta

  it('should return 3 when low is 3 and high is 7', () => {
    expect(countOdds(3, 7)).toBe(3)
  })
  it('should return 1 when low is 8 and high is 10', () => {
    expect(countOdds(8, 10)).toBe(1)
  })
  it('should return 1 when low is 21 and high is 22', () => {
    expect(countOdds(21, 22)).toBe(1)
  })
  it('should throw when low is not an integer', () => {
    expect(countOdds(8, 10)).toBe(1)
  })
  it('should throw when low is not an integer', () => {
    expect(() => {
      countOdds(0.8, 10)
    }).toThrowError(Error('low must be an integer'))
  })
  it('should throw when low is a negative number', () => {
    expect(() => {
      countOdds(-8, 10)
    }).toThrowError(Error('low must be a non negative integer'))
  })
  it('should throw when high is not an integer', () => {
    expect(() => {
      countOdds(8, 0.1)
    }).toThrowError(Error('high must be an integer'))
  })
  it('should throw when high is not an integer', () => {
    expect(() => {
      countOdds(8, -10)
    }).toThrowError(Error('high must be a non negative integer'))
  })
}
