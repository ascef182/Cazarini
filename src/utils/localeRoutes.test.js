import { describe, it, expect } from "vitest";
import { getAlternates, getLanguageForPath, getAlternatePath, BLOG_PT_PREFIX } from "./localeRoutes";

describe("getAlternates", () => {
  it("resolves static bilingual pairs from either side", () => {
    expect(getAlternates("/who-we-are")).toEqual({ en: "/who-we-are", pt: "/quem-somos" });
    expect(getAlternates("/quem-somos")).toEqual({ en: "/who-we-are", pt: "/quem-somos" });
  });

  it("resolves dynamic blog post pairs for either language", () => {
    expect(getAlternates("/blog/some-slug")).toEqual({
      en: "/blog/some-slug",
      pt: `${BLOG_PT_PREFIX}/some-slug`,
    });
    expect(getAlternates(`${BLOG_PT_PREFIX}/some-slug`)).toEqual({
      en: "/blog/some-slug",
      pt: `${BLOG_PT_PREFIX}/some-slug`,
    });
  });

  it("resolves the blog listing pair", () => {
    expect(getAlternates("/blog")).toEqual({ en: "/blog", pt: BLOG_PT_PREFIX });
  });

  it("returns null for routes with no bilingual counterpart", () => {
    expect(getAlternates("/insights")).toBeNull();
    expect(getAlternates("/")).toBeNull();
  });
});

describe("getLanguageForPath", () => {
  it("derives the language from static pair paths", () => {
    expect(getLanguageForPath("/quem-somos")).toBe("pt-br");
    expect(getLanguageForPath("/who-we-are")).toBe("en");
  });

  it("derives the language from blog paths", () => {
    expect(getLanguageForPath(`${BLOG_PT_PREFIX}/some-slug`)).toBe("pt-br");
    expect(getLanguageForPath("/blog/some-slug")).toBe("en");
    expect(getLanguageForPath(BLOG_PT_PREFIX)).toBe("pt-br");
    expect(getLanguageForPath("/blog")).toBe("en");
  });

  it("returns null for routes with no language signal", () => {
    expect(getLanguageForPath("/insights")).toBeNull();
  });
});

describe("getAlternatePath", () => {
  it("returns the sibling path for the requested language", () => {
    expect(getAlternatePath("/who-we-are", "pt-br")).toBe("/quem-somos");
    expect(getAlternatePath("/quem-somos", "en")).toBe("/who-we-are");
    expect(getAlternatePath("/blog/some-slug", "pt-br")).toBe(`${BLOG_PT_PREFIX}/some-slug`);
  });

  it("falls back to the same path when there is no sibling", () => {
    expect(getAlternatePath("/insights", "pt-br")).toBe("/insights");
  });
});
