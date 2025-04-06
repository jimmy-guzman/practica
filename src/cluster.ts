/**
 * Splits an array into chunks (clusters) of a specified size.
 *
 * @template T - The type of elements in the input array.
 *
 * @param items - The array to be chunked.
 *
 * @param size - The maximum size of each cluster (must be >= 1).
 *
 * @returns A new array containing arrays of chunked elements.
 *
 * @example
 * cluster([1, 2, 3, 4], 2)
 * // => [[1, 2], [3, 4]]
 */
const cluster = <T>(items: T[], size: number) => {
  const clusters: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    clusters.push(items.slice(i, i + size));
  }

  return clusters;
};

if (import.meta.vitest) {
  const {
    vitest: { expect, it },
  } = import.meta;

  it("should split a string array evenly", () => {
    const result = cluster(["a", "b", "c", "d"], 2);

    expect(result).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  it("should split a number array with remainder", () => {
    const result = cluster([1, 2, 3, 4, 5], 2);

    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should split into single-item clusters", () => {
    const result = cluster([1, 2, 3], 1);

    expect(result).toEqual([[1], [2], [3]]);
  });

  it("should return the full array as one cluster if size equals length", () => {
    const result = cluster([1, 2, 3], 3);

    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should return one cluster if size is larger than array length", () => {
    const result = cluster([1, 2, 3], 5);

    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should return an empty array when input is empty", () => {
    const result = cluster([], 2);

    expect(result).toEqual([]);
  });
}
