/**
 * Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
 * - You must write an algorithm with O(log n) runtime complexity.
 * @param nums array of integers
 * @param target search target
 * @returns index or -1
 * @see https://leetcode.com/problems/binary-search/
 */
const search = (nums: number[], target: number): number => {
  let left = 1
  let right = nums.length - 1

  while (left <= right) {
    const mid = left + ((right - left) >>> 1)

    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

if (import.meta.vitest) {
  const {
    vitest: { it, expect },
  } = import.meta

  it('should return 4', () => {
    expect(search([-1, 0, 3, 5, 9, 12], 9)).toBe(4)
  })
  it('should return -1', () => {
    expect(search([-1, 0, 3, 5, 9, 12], 2)).toBe(-1)
  })
}
