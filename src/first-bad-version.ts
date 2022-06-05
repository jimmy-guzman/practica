/**
 * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
 *
 * Suppose you have n versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.
 *
 * You are given an API bool `isBadVersion(version)` which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
 * @param isBadVersion
 * @returns
 * @see https://leetcode.com/problems/first-bad-version/
 */
const solution = (isBadVersion: (version: number) => boolean) => {
  return (num: number) => {
    let left = 1
    let right = num

    while (left < right) {
      const mid = left + ((right - left) >>> 1)

      if (isBadVersion(mid)) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }
}

if (import.meta.vitest) {
  const {
    vitest: { it, expect },
  } = import.meta

  it('should return 4', () => {
    const firstBadVersion = solution((version) => version === 4)

    expect(firstBadVersion(5)).toBe(4)
  })

  it('should return 1', () => {
    const firstBadVersion = solution((version) => version === 1)

    expect(firstBadVersion(1)).toBe(1)
  })
}
