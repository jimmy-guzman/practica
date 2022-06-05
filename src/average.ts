/**
 * You are given an array of unique integers salary where salary[i] is the salary of the ith employee.
 *
 * Return the average salary of employees excluding the minimum and maximum salary.
 *
 * - Answers within 10-5 of the actual answer will be accepted.
 * @param salary array of unique integers salary
 * @returns average salary of employees excluding the minimum and maximum salary
 * @see https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/
 */
const average = (salary: number[]): number => {
  const max = Math.max(...salary)
  const min = Math.min(...salary)
  const [sum, num] = salary.reduce(
    ([accSum, accNum], curr) => {
      return curr !== max && curr !== min
        ? [accSum + curr, accNum + 1]
        : [accSum, accNum]
    },
    [0, 0]
  )

  return sum / num
}

if (import.meta.vitest) {
  const {
    vitest: { it, expect },
  } = import.meta

  it('should return 2500 when 4000, 3000, 1000, 2000', () => {
    expect(average([4000, 3000, 1000, 2000])).toBe(2500)
  })

  it('should return 2000 when 1000, 2000, 300', () => {
    expect(average([1000, 2000, 3000])).toBe(2000)
  })

  it('should return 61866.666666666664 when 71000, 46000, 90000, 64000, 11000, 45000, 15000, 60000, 72000, 97000, 1000, 87000, 96000, 94000, 83000, 5000, 89000', () => {
    expect(
      average([
        71000, 46000, 90000, 64000, 11000, 45000, 15000, 60000, 72000, 97000,
        1000, 87000, 96000, 94000, 83000, 5000, 89000,
      ])
    ).toBe(61866.666666666664)
  })
}
