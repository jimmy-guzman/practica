/**
 * Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive)
 *
 * @param low non-negative integer
 *
 * @param high non-negative integer
 *
 * @returns count of odd numbers between low and high (inclusive)
 *
 * @see https://leetcode.com/problems/count-odd-numbers-in-an-interval-range
 */
const countOdds = (low: number, high: number): number => {
  return Math.floor((high - low) / 2) + (low & 1 || high & 1);
};

if (import.meta.vitest) {
  const {
    vitest: { expect, it },
  } = import.meta;

  it("should return 3 when low is 3 and high is 7", () => {
    expect(countOdds(3, 7)).toBe(3);
  });
  it("should return 1 when low is 8 and high is 10", () => {
    expect(countOdds(8, 10)).toBe(1);
  });
  it("should return 1 when low is 21 and high is 22", () => {
    expect(countOdds(21, 22)).toBe(1);
  });
}
