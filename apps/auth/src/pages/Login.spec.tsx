import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import Login from "./Login";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

vi.mock("ui/components", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="login-button">
      {children}
    </button>
  ),
  Input: ({ ...props }: any) => <input {...props} data-testid="input" />,
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test("renderiza o componente sem erros", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Olá, seja bem-vindo!")).toBeInTheDocument();

    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite o seu nome:")
    ).toBeInTheDocument();

    expect(screen.getByTestId("login-button")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
  });

  test("salva o nome no localStorage quando o formulário é submetido", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByTestId("input");
    const submitButton = screen.getByTestId("login-button");

    fireEvent.change(input, { target: { value: "João Silva" } });

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "userName",
          "João Silva"
        );
      },
      { timeout: 2000 }
    );

    expect(mockNavigate).toHaveBeenCalledWith("/clients/list");
  });
});
