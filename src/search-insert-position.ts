/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 *
 * - You must write an algorithm with O(log n) runtime complexity.
 *
 * @param nums sorted array of distinct integers
 *
 * @param target target value
 *
 * @see https://leetcode.com/problems/search-insert-position/
 */
const searchInsert = (nums: number[], target: number): number => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >>> 1);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] && nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

if (import.meta.vitest) {
  const {
    vitest: { expect, it },
  } = import.meta;

  it("should return 2", () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  });
  it("should return 1", () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  });
  it("should return 4", () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });
}
