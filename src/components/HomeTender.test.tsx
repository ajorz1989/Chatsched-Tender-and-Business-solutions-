import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeTender from "./HomeTender";

function renderHome() {
  return render(
    <MemoryRouter>
      <HomeTender />
    </MemoryRouter>,
  );
}

describe("HomeTender: honest copy and structure", () => {
  it("has exactly one h1 and it does not promise an outcome", () => {
    renderHome();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).not.toMatch(/win/i);
  });

  it("does not claim features the /tenders page says are not live", () => {
    const { container } = renderHome();
    const text = container.textContent ?? "";
    for (const banned of [
      "Win more bids",
      "track opportunities",
      "in one place",
      "Live across South Africa",
      "We point you to tenders",
      "guarantee",
    ]) {
      expect(text.toLowerCase()).not.toContain(banned.toLowerCase());
    }
  });

  it("keeps one primary and one secondary hero button, with partners as a quiet text link", () => {
    renderHome();
    const hero = screen.getByRole("heading", { level: 1 }).closest("section") as HTMLElement;
    const buttons = hero.querySelectorAll("a.brand-button");
    expect(buttons).toHaveLength(2);
    const partner = screen.getByRole("link", { name: /partner with us/i });
    expect(partner.getAttribute("href")).toBe("/for-partners");
    expect(partner.className).not.toContain("brand-button");
  });

  it("states who ChatSched is not, and links WhatsApp from step one", () => {
    renderHome();
    expect(screen.getByText(/not a law firm, audit firm, accounting firm/i)).toBeTruthy();
    const wa = screen.getByRole("link", { name: /message us on whatsapp/i });
    expect(wa.getAttribute("href")).toMatch(/^https:\/\//);
  });

  it("labels the example result as an example and uses a numbered list only for real steps", () => {
    const { container } = renderHome();
    expect(screen.getByText("Example only")).toBeTruthy();
    // Three numbered step lists at most (What we do, How it works); service and tool cards are plain lists.
    expect(container.querySelectorAll("ol").length).toBe(2);
  });
});
