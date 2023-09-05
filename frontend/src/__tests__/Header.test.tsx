import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test } from "vitest";
import Header from "../components/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });
  test("should render header component with description", async () => {
    expect(screen.queryByText("Loans For Good")).toBeInTheDocument();
  });
});
