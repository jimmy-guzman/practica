/**
 * Lazily splits an array into chunks (clusters) of a specified size.
 *
 * This generator yields one chunk at a time without allocating the full result in memory.
 * Useful for large arrays, streaming data, or early exit scenarios (e.g. breaking after N clusters).
 *
 * @template T - The type of elements in the input array.
 *
 * @param items - The array to be chunked.
 *
 * @param size - The size of each cluster (must be >= 1).
 *
 * @yields Arrays containing up to `size` elements from the input.
 *
 * @example
 * for (const group of lazyCluster([1, 2, 3, 4, 5], 2)) {
 *   console.log(group); // [1, 2], then [3, 4], then [5]
 * }
 */
function* lazyCluster<T>(items: T[], size: number): Generator<T[]> {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}

if (import.meta.vitest) {
  const {
    vitest: { expect, it },
  } = import.meta;

  it("should lazily split a string array evenly", () => {
    const result = [...lazyCluster(["a", "b", "c", "d"], 2)];

    expect(result).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  it("should lazily split a number array with remainder", () => {
    const result = [...lazyCluster([1, 2, 3, 4, 5], 2)];

    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should lazily split into single-item clusters", () => {
    const result = [...lazyCluster([1, 2, 3], 1)];

    expect(result).toEqual([[1], [2], [3]]);
  });

  it("should return the full array as one cluster if size equals length", () => {
    const result = [...lazyCluster([1, 2, 3], 3)];

    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should return one cluster if size is larger than array length", () => {
    const result = [...lazyCluster([1, 2, 3], 5)];

    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should return an empty array when input is empty", () => {
    const result = [...lazyCluster([], 2)];

    expect(result).toEqual([]);
  });
}
