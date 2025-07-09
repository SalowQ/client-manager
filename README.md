# Client Manager - Micro Frontend React

Este projeto é um sistema de gerenciamento de clientes implementado como uma aplicação React utilizando a arquitetura de Micro Frontends com Module Federation. O objetivo é demonstrar conhecimentos em desenvolvimento frontend, arquitetura de software e boas práticas de programação.

## 🌐 URLs

### Produção

- **Aplicação Principal**: https://client-manager-eta.vercel.app/
- **Auth**: https://auth-client-manager.vercel.app/
- **Clients**: https://clients-client-manager.vercel.app/
- **UI Library**: https://ui-client-manager.vercel.app/

### Desenvolvimento

- **Host**: http://localhost:5173
- **Auth**: http://localhost:3001
- **Clients**: http://localhost:3002
- **UI Library**: http://localhost:3003

## 🚀 Tecnologias Utilizadas

### Core

- **React 19** - Biblioteca principal para desenvolvimento
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Module Federation** - Arquitetura de micro frontends

### UI/UX

- **Tailwind CSS 4** - Framework de estilização
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado e cache
- **React Toastify** - Notificações
- **Material Icons/Google Fonts** - Ícones

### Desenvolvimento

- **ESLint** - Linting de código
- **Vitest** - Testes unitários
- **Cypress** - Testes E2E
- **MSW** - Mock Service Worker

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd client-manager
```

2. Instale as dependências de todos os projetos:

```bash
# Instalar dependências de cada aplicação
cd apps/auth && npm install
cd ../clients && npm install
cd ../host && npm install

# Instalar dependências da biblioteca UI
cd ../../libs/ui && npm install
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
# Inicia o host
cd apps/host && npm run dev

# Builda cada micro frontend e observa mudanças
cd apps/auth && npm run build:watch
cd apps/clients && npm run build:watch
cd libs/ui && npm run build:watch
```

O projeto estará disponível em:

- **Host**: http://localhost:3000
- **Auth**: http://localhost:3001
- **Clients**: http://localhost:3002
- **UI Library**: http://localhost:3003

### Build

Para criar uma build de produção:

```bash
# Build do projeto raiz (host)
cd apps/host && npm run build

# Build de cada micro frontend
cd apps/auth && npm run build
cd apps/clients && npm run build

# Build da biblioteca UI
cd libs/ui && npm run build
```

## 🧪 Testes

### Executando os Testes Unitários

```bash
# Testes do projeto auth
cd apps/auth && npm run test

# Testes do projeto clients
cd apps/clients && npm run test
```

### Executando os Testes E2E (Cypress)

1. Inicie a aplicação (todos os micro frontends):

```bash
# Inicia o host
cd apps/host && npm run dev

# Builda cada micro frontend e observa mudanças
cd apps/auth && npm run build:watch
cd apps/clients && npm run build:watch
```

2. Em outro terminal, rode o Cypress:

```bash
# Para abrir a interface do Cypress
npx cypress open

# Para rodar os testes E2E em modo headless
npx cypress run
```

Os testes E2E estão localizados em `apps/host/cypress/e2e/`.

### Estrutura dos Testes

Os testes estão organizados seguindo as melhores práticas:

- **Testes unitários** para componentes
- **Mocks** para serviços externos (MSW)
- **Testes E2E** com Cypress para fluxos completos da aplicação

## 📁 Estrutura do Projeto

```
client-manager/
├── apps/
│   ├── auth/                 # Micro frontend de Autenticação
│   │   ├── src/
│   │   │   ├── pages/        # Páginas de login
│   │   │   └── components/   # Componentes de autenticação
│   │   └── package.json
│   ├── clients/              # Micro frontend de Gerenciamento de Clientes
│   │   ├── src/
│   │   │   ├── pages/        # Páginas de listagem e CRUD
│   │   │   ├── components/   # Componentes de clientes
│   │   │   ├── api/          # Serviços de API
│   │   │   └── lib/          # Utilitários e configurações
│   │   └── package.json
│   └── host/                 # Aplicação principal (Container)
│       ├── src/
│       │   ├── pages/        # Páginas do container
│       │   └── components/   # Componentes compartilhados
│       ├── cypress/          # Testes E2E
│       └── package.json
├── libs/
│   └── ui/                   # Biblioteca de componentes compartilhados
│       ├── src/
│       │   └── components/   # Componentes reutilizáveis
│       └── package.json
└── docker-compose.yml        # Configuração Docker
```

## 🔄 Fluxo de Desenvolvimento

### Desenvolvimento Local

1. **Desenvolvimento Independente**: Cada micro frontend pode ser desenvolvido independentemente
2. **Implementação**: Implemente as funcionalidades seguindo os requisitos especificados

### Integração

1. **Module Federation**: Os micro frontends são integrados através do host
2. **Carregamento Dinâmico**: O host gerencia o carregamento dinâmico dos módulos
3. **Navegação**: Implemente a navegação entre as telas conforme especificado

### Deploy

1. **Deploy Separado**: Cada micro frontend pode ser deployado separadamente
2. **Vercel**: Configuração específica para cada aplicação no Vercel
3. **Integração**: O host precisa ser atualizado com as novas versões dos micro frontends

## 🚀 Deploy no Vercel

### Por que Deploy Separado?

Cada micro frontend precisa expor sua `remoteEntry.js` publicamente para que o Module Federation funcione corretamente.

### Configuração dos Projetos Vercel

#### 1. **Projeto Host** (Principal)

- **Repository**: Este repositório
- **Root Directory**: `apps/host`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

#### 2. **Projeto Auth**

- **Repository**: Este repositório
- **Root Directory**: `apps/auth`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

#### 3. **Projeto Clients**

- **Repository**: Este repositório
- **Root Directory**: `apps/clients`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

#### 4. **Projeto UI** (Opcional)

- **Repository**: Este repositório
- **Root Directory**: `libs/ui`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

### URLs de Produção

Cada aplicação tem sua própria URL, mas a aplicação host funciona como container:

- **Host (Container)**: `https://client-manager-eta.vercel.app`
  - `/auth/*` → Carrega aplicação auth via Module Federation
  - `/clients/*` → Carrega aplicação clients via Module Federation
- **Auth**: `https://auth-client-manager.vercel.app` (acesso direto)
- **Clients**: `https://clients-client-manager.vercel.app` (acesso direto)
- **UI**: `https://ui-client-manager.vercel.app` (biblioteca compartilhada)

### Rotas Disponíveis

- **Host**: `https://client-manager-eta.vercel.app/` → redireciona para `/auth/login`
- **Auth via Host**: `https://client-manager-eta.vercel.app/auth/login` → página de login
- **Clients via Host**: `https://client-manager-eta.vercel.app/clients/list` → lista de clientes

## 📝 Scripts Disponíveis

### Scripts de Desenvolvimento

- `npm run dev` - Executa o servidor de desenvolvimento (Vite)
- `npm run build:watch` - Build com watch mode (auth, clients, ui)

### Scripts de Build

- `npm run build` - Build de produção
- `npm run preview` - Preview da build de produção

### Scripts de Qualidade

- `npm run lint` - Lint do código
- `npm run test` - Testes unitários (auth, clients)

### Scripts Específicos por Projeto

#### Auth (`apps/auth/`)

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run build:watch` - Build com watch mode
- `npm run preview` - Preview da build
- `npm run lint` - Lint do código
- `npm run test` - Testes unitários

#### Clients (`apps/clients/`)

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run build:watch` - Build com watch mode
- `npm run preview` - Preview da build
- `npm run lint` - Lint do código
- `npm run test` - Testes unitários

#### Host (`apps/host/`)

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Lint do código

#### UI (`libs/ui/`)

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run build:watch` - Build com watch mode
- `npm run preview` - Preview da build
- `npm run lint` - Lint do código

## 🐳 Docker

Para executar o projeto com Docker:

```bash
# Build e execução com Docker Compose
docker-compose up --build
```

## 📚 Funcionalidades

- **Navegação SPA**: Todas as navegações usam React Router Dom (sem recarregar página)
- **Logout**: Remove dados do localStorage e navega para `/auth/login`
- **Module Federation**: Carrega aplicações federadas dinamicamente
- **Responsividade**: Interface adaptável para diferentes dispositivos
- **Formulários**: Validação e gerenciamento de estado com React Hook Form
- **Cache**: Gerenciamento de cache com React Query
- **Testes**: Cobertura completa com testes unitários e E2E
