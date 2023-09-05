import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";

const loansProposalMockResponse = {
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
};

const fieldsResponse = [
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
];

export const restHandlers = [
  rest.get("http://localhost:8000/fields", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fieldsResponse));
  }),

  rest.post("http://localhost:8000/loans/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(loansProposalMockResponse));
  }),
];

export const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
