import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const Probe = () => {
  const { t, isPortuguese, toggleLanguage, language } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="is-pt">{String(isPortuguese)}</span>
      <span data-testid="known-key">{t("common.readArticle")}</span>
      <span data-testid="missing-key">{t("nope.doesNotExist")}</span>
      <button onClick={toggleLanguage}>toggle</button>
    </div>
  );
};

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English and resolves translation keys", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("is-pt")).toHaveTextContent("false");
    expect(screen.getByTestId("known-key")).toHaveTextContent("Read Article");
  });

  it("falls back to the key itself when a translation is missing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );

    expect(screen.getByTestId("missing-key")).toHaveTextContent("nope.doesNotExist");
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("toggleLanguage flips between en and pt-br, persisting to localStorage", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText("toggle"));

    expect(screen.getByTestId("lang")).toHaveTextContent("pt-br");
    expect(screen.getByTestId("is-pt")).toHaveTextContent("true");
    expect(screen.getByTestId("known-key")).toHaveTextContent("Ler Artigo");
    expect(localStorage.getItem("language")).toBe("pt-br");
    expect(document.documentElement.lang).toBe("pt-BR");
  });
});
