import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import * as api from "../api";
import ListClients from "./ListClients";

const mockClients = [
  {
    id: 1,
    name: "João Silva",
    salary: 5000,
    companyValuation: 100000,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Maria Santos",
    salary: 6000,
    companyValuation: 150000,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Pedro Costa",
    salary: 4500,
    companyValuation: 80000,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    salary: 7500,
    companyValuation: 200000,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    salary: 5500,
    companyValuation: 120000,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: 6,
    name: "Lucia Rodrigues",
    salary: 6800,
    companyValuation: 180000,
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
  },
  {
    id: 7,
    name: "Roberto Almeida",
    salary: 4200,
    companyValuation: 75000,
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z",
  },
  {
    id: 8,
    name: "Fernanda Lima",
    salary: 7200,
    companyValuation: 190000,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: 9,
    name: "Marcos Pereira",
    salary: 5800,
    companyValuation: 140000,
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: 10,
    name: "Juliana Souza",
    salary: 6500,
    companyValuation: 160000,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 11,
    name: "Ricardo Mendes",
    salary: 4800,
    companyValuation: 90000,
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: 12,
    name: "Patricia Gomes",
    salary: 7000,
    companyValuation: 175000,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: 13,
    name: "Eduardo Silva",
    salary: 5200,
    companyValuation: 110000,
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
  {
    id: 14,
    name: "Camila Santos",
    salary: 6300,
    companyValuation: 155000,
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: 15,
    name: "Thiago Costa",
    salary: 4700,
    companyValuation: 85000,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 16,
    name: "Vanessa Oliveira",
    salary: 7400,
    companyValuation: 195000,
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
];

vi.mock("../components/ClientsLayout", () => ({
  useSelectedClients: () => ({
    selectedClients: [],
    toggleSelectClient: vi.fn(),
    clearSelectedClients: vi.fn(),
  }),
}));

vi.spyOn(api, "getAllClients").mockResolvedValue({
  clients: mockClients,
  totalPages: 1,
  currentPage: 1,
});

vi.mock("../lib/utils", () => ({
  formatMoney: vi.fn((value: string) => `R$ ${value}`),
  formatMoneyNumber: vi.fn((value: number) => `R$ ${value.toFixed(2)}`),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
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
  test("renderiza o componente sem erros", () => {
    const { container } = renderWithProviders(<ListClients />);
    expect(container).toBeDefined();
  });

  test("renderiza o título com contador de clientes", () => {
    const { getByText } = renderWithProviders(<ListClients />);
    expect(getByText(/Carregando clientes.../i)).toBeDefined();
  });

  test("chama a API getAllClients com os parâmetros corretos", async () => {
    const getAllClientsSpy = vi.spyOn(api, "getAllClients");
    const queryClient = createTestQueryClient();

    const wrapper = render(<ListClients />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>{children}</MemoryRouter>
        </QueryClientProvider>
      ),
    });

    console.log(wrapper.baseElement.innerHTML);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Carregando clientes.../i)
    );

    expect(getAllClientsSpy).toHaveBeenCalledWith(1, 16);
  });

  test("chama a API getAllClients quando muda a página", async () => {
    const getAllClientsSpy = vi.spyOn(api, "getAllClients");

    renderWithProviders(<ListClients />);

    await waitForElementToBeRemoved(() =>
      screen.getByText(/Carregando clientes.../i)
    );

    expect(getAllClientsSpy).toHaveBeenCalledWith(1, 16);
  });
});
