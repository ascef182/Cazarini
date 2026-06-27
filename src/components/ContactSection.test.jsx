import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactSection from "./ContactSection";
import { LanguageProvider } from "../context/LanguageContext";

const renderForm = () => render(<ContactSection />, { wrapper: LanguageProvider });

describe("ContactSection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows validation errors when submitting without filling required fields", async () => {
    renderForm();

    fireEvent.click(screen.getByText("Coffee Buyer"));
    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 3 characters")).toBeInTheDocument();
    });
  });

  it("reveals buyer-specific fields once a role is selected", () => {
    const { container } = renderForm();

    expect(container.querySelector('select[name="buyerType"]')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Coffee Buyer"));

    expect(container.querySelector('select[name="buyerType"]')).toBeInTheDocument();
  });

  it("submits successfully to Formspree when all required fields are valid", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = renderForm();

    fireEvent.click(screen.getByText("Coffee Buyer"));

    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Jane Buyer" } });
    fireEvent.change(screen.getByPlaceholderText("john@company.com"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Your Coffee Company"), { target: { value: "Acme Roasters" } });
    fireEvent.change(screen.getByPlaceholderText("+1 (555) 123-4567"), { target: { value: "5551234567" } });
    fireEvent.change(screen.getByPlaceholderText(/sourcing needs/i), {
      target: { value: "We are looking for a long-term Arabica supply partnership." },
    });

    fireEvent.change(container.querySelector('select[name="buyerType"]'), { target: { value: "company" } });
    fireEvent.change(container.querySelector('select[name="volume"]'), { target: { value: "1-50" } });
    fireEvent.click(container.querySelector('input[type="checkbox"]'));

    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument();
    });

    const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`;
    expect(fetchMock).toHaveBeenCalledWith(
      FORMSPREE_URL,
      expect.objectContaining({ method: "POST" })
    );
  });

  it("does not submit when the honeypot field is filled", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = renderForm();
    fireEvent.click(screen.getByText("Coffee Buyer"));

    const honeypot = container.querySelector('input[name="_gotcha"]');
    fireEvent.change(honeypot, { target: { value: "spam bot filled this" } });

    fireEvent.change(screen.getByPlaceholderText("John Doe"), { target: { value: "Jane Buyer" } });
    fireEvent.change(screen.getByPlaceholderText("john@company.com"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Your Coffee Company"), { target: { value: "Acme Roasters" } });
    fireEvent.change(screen.getByPlaceholderText("+1 (555) 123-4567"), { target: { value: "5551234567" } });
    fireEvent.change(screen.getByPlaceholderText(/sourcing needs/i), {
      target: { value: "We are looking for a long-term Arabica supply partnership." },
    });
    fireEvent.change(container.querySelector('select[name="buyerType"]'), { target: { value: "company" } });
    fireEvent.change(container.querySelector('select[name="volume"]'), { target: { value: "1-50" } });
    fireEvent.click(container.querySelector('input[type="checkbox"]'));

    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
