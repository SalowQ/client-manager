import { render, screen } from "@testing-library/react";
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
});
