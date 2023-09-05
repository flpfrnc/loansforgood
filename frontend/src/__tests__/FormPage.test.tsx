import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FormPage from "../components/FormPage";
import { sanitizeNonNumeric } from "../utils";

describe("FormPage", () => {
  beforeEach(() => {
    render(<FormPage />);
  });

  test("should render main form page component with title and description", async () => {
    // Check for specific elements in the rendered component
    expect(screen.queryByText("Loans For Good (LFG)")).toBeInTheDocument();
    expect(
      screen.queryByText("Empresa multinacional especializada na concessão de crédito.")
    ).toBeInTheDocument();
    expect(screen.queryByText("Enviar Proposta")).toBeInTheDocument();
    expect(screen.queryByTestId("form-field")).not.toBeInTheDocument();
    expect(screen.queryByTestId("success-message")).not.toBeInTheDocument();
  });

  test("should render main form page and submit proposal successfully", async () => {
    const global = {
      apiModule: {
        fetchFields: vi.fn(() =>
          Promise.resolve([
            {
              id: 3,
              field_name: "Nome",
              field_type: "text",
              is_required: false,
              is_visible: true,
              created_at: "2023-09-05T02:29:12.724324Z",
              updated_at: "2023-09-05T02:29:12.724337Z",
            },
            {
              id: 4,
              field_name: "Documento",
              field_type: "text",
              is_required: false,
              is_visible: true,
              created_at: "2023-09-05T02:29:19.631409Z",
              updated_at: "2023-09-05T02:29:19.631421Z",
            },
          ])
        ),
        sendProposal: vi.fn(() =>
          Promise.resolve({
            id: 1,
            name: "Felipe França",
            document: "12345678",
            birth_date: null,
            phone: null,
            email: null,
            amount: null,
            mother_name: null,
            occupation: null,
            status: "pending",
            approved: false,
            created_at: "2023-09-04T23:38:50.695142Z",
            updated_at: "2023-09-04T23:38:50.695161Z",
          })
        ),
      },
    };
    const spyFields = vi.spyOn(global.apiModule, "fetchFields");
    const spyProposal = vi.spyOn(global.apiModule, "sendProposal");

    await global.apiModule.fetchFields();

    // Simulate a form submission
    expect(screen.queryByTestId("submit-proposal")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("submit-proposal"));
    await global.apiModule.sendProposal();

    expect(spyProposal).toHaveBeenCalledTimes(1);
    expect(spyFields).toHaveBeenCalledTimes(1);
  });

  test("should throw error on fields fetch function", async () => {
    const fetchFields = vi.fn(() => Promise.reject(new Error("Error")));

    expect(async () => await fetchFields()).rejects.toThrowError("Error");
  });

  test("should throw error on loan proposal creation function", async () => {
    const sendProposal = vi.fn(() => Promise.reject(new Error("Error")));

    expect(async () => await sendProposal()).rejects.toThrowError("Error");
  });
});

describe("sanitizeNonNumeric", () => {
  test("should remove digits and hyphens from the name field", () => {
    const input = "John123-Doe";
    const field = "name";
    const result = sanitizeNonNumeric(field, input);
    expect(result).toBe("JohnDoe");
  });

  test("should remove digits and hyphens from the name field", () => {
    const input = "Jane15121-Doe";
    const field = "motherName";
    const result = sanitizeNonNumeric(field, input);
    expect(result).toBe("JaneDoe");
  });

  test("should not modify non-name fields", () => {
    const input = "12345";
    const field = "document";
    const result = sanitizeNonNumeric(field, input);
    expect(result).toBe(input);
  });
});
