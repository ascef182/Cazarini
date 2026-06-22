import "@testing-library/jest-dom/vitest";

// Node 22+ ships an experimental global `localStorage` that shadows jsdom's
// window.localStorage and warns/no-ops without --localstorage-file. Replace
// it with a simple in-memory implementation so LanguageContext's
// localStorage.getItem/setItem calls work the same as in a real browser.
class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
  get length() {
    return this.store.size;
  }
  key(index) {
    return Array.from(this.store.keys())[index] ?? null;
  }
}

const memoryStorage = new MemoryStorage();
for (const target of [globalThis, window]) {
  Object.defineProperty(target, "localStorage", {
    value: memoryStorage,
    configurable: true,
    writable: true,
  });
}
