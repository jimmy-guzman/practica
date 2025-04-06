/**
 * A Least Recently Used (LRU) Cache with fixed capacity.
 * Stores key-value pairs and evicts the least recently used entry when full.
 *
 * @template Key - The type of keys used in the cache.
 *
 * @template Value - The type of values stored in the cache.
 */
class LRUCache<Key, Value> {
  /**
   * Internal cache map maintaining insertion order for LRU tracking.
   */
  private cache = new Map<Key, Value>();

  /**
   * Creates a new LRUCache with a maximum capacity.
   *
   * @param capacity - The maximum number of items the cache can hold.
   */
  constructor(private capacity: number) {}

  /**
   * Retrieves a value by key and marks it as recently used.
   *
   * @param key - The key to retrieve.
   *
   * @returns The value if found; otherwise, `undefined`.
   */
  public get(key: Key) {
    if (!this.cache.has(key)) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- this is okay due to has()
    const value = this.cache.get(key)!;

    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  /**
   * Inserts or updates a key-value pair and marks it as recently used.
   * If the cache exceeds its capacity, evicts the least recently used item.
   *
   * @param key - The key to insert or update.
   *
   * @param value - The value to associate with the key.
   */
  public set(key: Key, value: Value): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      this.evict();
    }
  }

  private evict(): void {
    const firstKey = this.cache.keys().next().value;

    if (firstKey !== undefined) {
      this.cache.delete(firstKey);
    }
  }
}

if (import.meta.vitest) {
  const {
    vitest: { expect, it },
  } = import.meta;

  it.each([
    ["string key/value", "key", "value", "value"],
    ["number key/value", 1, 42, 42],
    ["zero value", "zero", 0, 0],
    ["boolean value", "b", false, false],
    ["null value", "n", null, null],
    ["undefined value", "u", undefined, undefined],
    ["object value", "o", { x: 1 }, { x: 1 }],
  ])("should store and retrieve %s", (_label, key, value, expected) => {
    const cache = new LRUCache<unknown, unknown>(2);

    cache.set(key, value);
    expect(cache.get(key)).toEqual(expected);
  });

  it("should return undefined for missing keys", () => {
    const cache = new LRUCache<string, number>(2);

    expect(cache.get("missing")).toBeUndefined();
  });

  it("should evict the least recently used item", () => {
    const cache = new LRUCache<string, number>(2);

    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a"); // a is now most recently used
    cache.set("c", 3); // b should be evicted

    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
  });

  it("should update existing keys and move them to most recent", () => {
    const cache = new LRUCache<string, number>(2);

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("a", 10); // update 'a'
    cache.set("c", 3); // evict 'b'

    expect(cache.get("a")).toBe(10);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
  });
}
