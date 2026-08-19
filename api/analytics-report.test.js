import { describe, it, expect } from "vitest";
import {
  isValidGa4Date,
  resolveDate,
  resolveDateRange,
  computePreviousRange,
  percentChange,
} from "./analytics-report.js";

describe("isValidGa4Date", () => {
  it("accepts relative expressions and ISO dates", () => {
    expect(isValidGa4Date("today")).toBe(true);
    expect(isValidGa4Date("yesterday")).toBe(true);
    expect(isValidGa4Date("60daysAgo")).toBe(true);
    expect(isValidGa4Date("7daysAgo")).toBe(true);
    expect(isValidGa4Date("2026-08-19")).toBe(true);
  });

  it("rejects anything else, including injection attempts", () => {
    expect(isValidGa4Date("")).toBe(false);
    expect(isValidGa4Date(undefined)).toBe(false);
    expect(isValidGa4Date("2026/08/19")).toBe(false);
    expect(isValidGa4Date("daysAgo")).toBe(false);
    expect(isValidGa4Date("60 daysAgo")).toBe(false);
    expect(isValidGa4Date("'; DROP TABLE")).toBe(false);
  });
});

describe("resolveDate", () => {
  it("resolves NdaysAgo relative to UTC midnight today", () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const expected = new Date(today);
    expected.setUTCDate(expected.getUTCDate() - 7);
    expect(resolveDate("7daysAgo")).toEqual(expected);
  });

  it("resolves ISO dates exactly", () => {
    expect(resolveDate("2026-08-19")).toEqual(new Date(Date.UTC(2026, 7, 19)));
  });

  it("returns null for unparseable input", () => {
    expect(resolveDate("not-a-date")).toBeNull();
  });
});

describe("resolveDateRange", () => {
  const DEFAULT = { startDate: "60daysAgo", endDate: "today" };

  it("falls back to the default when query params are missing", () => {
    expect(resolveDateRange({ query: {} })).toEqual(DEFAULT);
    expect(resolveDateRange({})).toEqual(DEFAULT);
  });

  it("falls back when either date is invalid", () => {
    expect(
      resolveDateRange({ query: { startDate: "bogus", endDate: "today" } })
    ).toEqual(DEFAULT);
  });

  it("falls back when startDate is after endDate", () => {
    expect(
      resolveDateRange({
        query: { startDate: "2026-08-19", endDate: "2026-08-01" },
      })
    ).toEqual(DEFAULT);
  });

  it("falls back when the range exceeds the sanity cap", () => {
    expect(
      resolveDateRange({
        query: { startDate: "2020-01-01", endDate: "2026-08-19" },
      })
    ).toEqual(DEFAULT);
  });

  it("passes through a valid custom range", () => {
    const range = { startDate: "2026-07-01", endDate: "2026-07-31" };
    expect(resolveDateRange({ query: range })).toEqual(range);
  });

  it("accepts preset relative ranges", () => {
    const range = { startDate: "7daysAgo", endDate: "today" };
    expect(resolveDateRange({ query: range })).toEqual(range);
  });
});

describe("computePreviousRange", () => {
  it("returns the immediately preceding period of equal length", () => {
    expect(
      computePreviousRange({ startDate: "2026-08-10", endDate: "2026-08-19" })
    ).toEqual({ startDate: "2026-07-31", endDate: "2026-08-09" });
  });

  it("handles a single-day range", () => {
    expect(
      computePreviousRange({ startDate: "2026-08-19", endDate: "2026-08-19" })
    ).toEqual({ startDate: "2026-08-18", endDate: "2026-08-18" });
  });

  it("returns null when the range can't be resolved", () => {
    expect(
      computePreviousRange({ startDate: "nope", endDate: "today" })
    ).toBeNull();
  });
});

describe("percentChange", () => {
  it("computes a fractional change", () => {
    expect(percentChange(150, 100)).toBeCloseTo(0.5);
    expect(percentChange(50, 100)).toBeCloseTo(-0.5);
  });

  it("returns 0 when both current and previous are zero", () => {
    expect(percentChange(0, 0)).toBe(0);
  });

  it("returns null when there's growth from a zero baseline", () => {
    expect(percentChange(10, 0)).toBeNull();
  });
});
