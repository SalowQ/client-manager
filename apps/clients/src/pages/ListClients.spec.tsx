import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListClients from "./ListClients";

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
  Button: ({ children, variant, ...props }: any) => {
    let testId = "button";

    if (variant === "outline") {
      testId = "main-create-button";
    } else if (children === "Criar cliente") {
      testId = "create-modal-submit-button";
    } else if (children === "Editar cliente") {
      testId = "edit-modal-submit-button";
    } else if (children === "Excluir cliente") {
      testId = "delete-modal-submit-button";
    }

    return (
      <button data-testid={testId} {...props}>
        {children}
      </button>
    );
  },
  CardGrid: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  ClientCard: ({ name, salary, company, ...props }: any) => (
    <div data-testid="client-card" {...props}>
      <div data-testid="client-name">{name}</div>
      <div data-testid="client-salary">{salary}</div>
      <div data-testid="client-company">{company}</div>
    </div>
  ),
  Input: ({ ...props }: any) => <input {...props} />,
  Modal: ({ children, ...props }: any) => (
    <div data-testid="modal" {...props}>
      {children}
    </div>
  ),
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
    getValues: vi.fn(() => ({
      name: "João Silva",
      salary: "R$ 5000,00",
      companyValuation: "R$ 100000,00",
    })),
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
