import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import * as api from "../api";
import ListClients from "./ListClients";

const responseMockClients = {
  clients: [
    {
      id: 3,
      name: "joão silva",
      salary: 5000,
      companyValuation: 34242.34,
      createdAt: "2025-07-06T16:08:53.778Z",
      updatedAt: "2025-07-06T17:04:01.179Z",
    },
    {
      id: 4,
      name: "maria",
      salary: 3242.53,
      companyValuation: 43534.54,
      createdAt: "2025-07-06T16:40:08.462Z",
      updatedAt: "2025-07-06T16:40:08.462Z",
    },
    {
      id: 6,
      name: "samantha",
      salary: 4353.45,
      companyValuation: 543543.56,
      createdAt: "2025-07-06T16:40:29.205Z",
      updatedAt: "2025-07-06T16:40:29.205Z",
    },
    {
      id: 7,
      name: "sherlock",
      salary: 45344.35,
      companyValuation: 435534.53,
      createdAt: "2025-07-06T16:40:42.368Z",
      updatedAt: "2025-07-06T16:40:42.368Z",
    },
    {
      id: 8,
      name: "watson",
      salary: 6675.66,
      companyValuation: 54656.46,
      createdAt: "2025-07-06T16:40:52.597Z",
      updatedAt: "2025-07-06T16:40:52.597Z",
    },
    {
      id: 9,
      name: "arthur",
      salary: 5877.88,
      companyValuation: 567464.54,
      createdAt: "2025-07-06T16:41:03.898Z",
      updatedAt: "2025-07-06T16:41:03.898Z",
    },
    {
      id: 10,
      name: "jim",
      salary: 7456.35,
      companyValuation: 543454.58,
      createdAt: "2025-07-06T16:41:23.381Z",
      updatedAt: "2025-07-06T17:08:06.520Z",
    },
    {
      id: 11,
      name: "paulinho",
      salary: 4534.43,
      companyValuation: 345345.35,
      createdAt: "2025-07-06T17:04:31.387Z",
      updatedAt: "2025-07-06T17:15:10.452Z",
    },
    {
      id: 12,
      name: "John Doe",
      salary: 5000,
      companyValuation: 500000,
      createdAt: "2025-07-07T11:23:17.416Z",
      updatedAt: "2025-07-07T11:23:17.416Z",
    },
  ],
  totalPages: 1,
  currentPage: 1,
};

vi.mock("../components/ClientsLayout", () => ({
  useSelectedClients: () => ({
    selectedClients: [],
    toggleSelectClient: vi.fn(),
    clearSelectedClients: vi.fn(),
    addSelectedClient: vi.fn(),
    removeSelectedClient: vi.fn(),
  }),
}));

vi.mock("ui/components", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  CardGrid: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  ClientCard: ({ name, salary, company, ...props }: any) => (
    <div data-testid="client-card" {...props}>
      <div data-testid="client-name">{name}</div>
      <div data-testid="client-salary">{salary}</div>
      <div data-testid="client-company">{company}</div>
    </div>
  ),
  Input: ({ ...props }: any) => <input {...props} />,
  Modal: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Pagination: ({ ...props }: any) => <div {...props}>Pagination</div>,
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(() => ({ onChange: vi.fn() })),
    handleSubmit: vi.fn((fn) => fn),
    setValue: vi.fn(),
    reset: vi.fn(),
    formState: { errors: {} },
    clearErrors: vi.fn(),
  }),
}));

vi.mock("../lib/utils", () => ({
  formatMoney: vi.fn((value: string) => `R$ ${value}`),
  formatMoneyNumber: vi.fn((value: number) => `R$ ${value.toFixed(2)}`),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("ListClients", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza o componente sem erros", () => {
    renderWithProviders(<ListClients />);
    expect(screen).toBeDefined();
  });

  test("renderiza o texto de carregamento de clientes", () => {
    renderWithProviders(<ListClients />);
    expect(screen.getByText(/Carregando clientes.../i)).toBeInTheDocument();
  });

  test("renderiza a tabela com os clientes", async () => {
    renderWithProviders(<ListClients />);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Carregando clientes.../i)
    );
    expect(screen.getByText("joão silva")).toBeInTheDocument();
  });
});
