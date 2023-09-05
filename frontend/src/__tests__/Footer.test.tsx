import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test("should render footer component with description", async () => {
    expect(screen.queryByText("Loans For Good - 2023")).toBeInTheDocument();
  });
});
