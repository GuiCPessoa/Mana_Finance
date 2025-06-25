# Visão Geral do Projeto: Mana Finance

## 1. Introdução

Mana Finance é uma aplicação web de gerenciamento financeiro pessoal. O objetivo é fornecer aos usuários uma maneira simples e intuitiva de rastrear suas receitas e despesas, bem como definir e acompanhar seus objetivos financeiros. A interface é projetada para ser limpa, moderna e fácil de usar.

## 2. Tecnologias Utilizadas

O projeto é construído com um stack de tecnologias moderno baseado em React e TypeScript.

### Frontend:
- **Framework:** [React](https://react.dev/) 18.x
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) - Uma coleção de componentes reutilizáveis construídos sobre Radix UI e Tailwind CSS.
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Validação de Schema:** [Zod](https://zod.dev/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Gerenciamento de Estado (Cliente):** [TanStack Query (React Query)](https://tanstack.com/query/latest) para data fetching e caching (embora atualmente o estado seja local) e Context API do React para o estado global.

### Ferramentas de Desenvolvimento:
- **Linter:** [ESLint](https://eslint.org/)
- **Gerenciador de Pacotes:** `npm` ou `bun` (conforme `package.json` e `bun.lockb`).

## 3. Estrutura do Projeto

A estrutura de pastas principal está organizada dentro de `/src`:

```
src/
├── App.tsx             # Componente principal, configuração de rotas
├── main.tsx            # Ponto de entrada da aplicação
├── components/         # Componentes React reutilizáveis
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── AddTransactionDialog.tsx
│   ├── FinancialChart.tsx
│   └── ...
├── contexts/
│   └── AppContext.tsx  # Contexto global para gerenciar transações e objetivos
├── hooks/
│   └── ...             # Hooks customizados
├── pages/
│   ├── Index.tsx       # Página principal (Dashboard)
│   ├── TransactionFilters.tsx
│   └── NotFound.tsx
└── lib/
    └── utils.ts        # Funções utilitárias (ex: cn para classnames)
```

## 4. Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento local.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm` ou `bun`

**Passos:**

1.  **Clonar o repositório (se aplicável):**
    ```bash
    git clone <url-do-repositorio>
    cd Mana_Finance
    ```

2.  **Instalar as dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    bun install
    ```

3.  **Executar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Compila a aplicação para produção.
-   `npm run lint`: Executa o linter para verificar a qualidade do código.
-   `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## 5. Arquitetura e Fluxo de Dados

### Gerenciamento de Estado
O estado global da aplicação é gerenciado através do `AppContext` (`src/contexts/AppContext.tsx`). Este contexto é responsável por armazenar e manipular:
-   **Transações:** Uma lista de todas as receitas e despesas.
-   **Objetivos:** Uma lista dos objetivos financeiros do usuário.

**Importante:** Atualmente, o estado é armazenado **apenas em memória**. Isso significa que **todas as transações e objetivos serão perdidos ao recarregar a página**. Para persistir os dados, seria necessário implementar uma solução de armazenamento como `localStorage` ou conectar a um backend.

### Componentes Chave

-   `pages/Index.tsx`: O coração da aplicação. Renderiza o dashboard principal, incluindo os cards de resumo (Receitas, Despesas, Saldo), os botões de ação e os principais módulos da tela.
-   `components/TransactionsList.tsx`: Exibe a lista de transações recentes e permite a edição ou exclusão.
-   `components/ObjectivesList.tsx`: Exibe a lista de objetivos financeiros.
-   `components/AddTransactionDialog.tsx` e `components/AddObjectiveDialog.tsx`: Modais utilizados para adicionar novas transações e objetivos, utilizando `react-hook-form` e `zod` para validação.
-   `components/FinancialChart.tsx`: Um gráfico de barras (usando Recharts) que visualiza as transações ao longo do tempo.

## 6. Próximos Passos e Melhorias Sugeridas

-   **Persistência de Dados:** Implementar `localStorage` para salvar os dados no navegador do usuário entre as sessões. Esta é a melhoria mais crítica para tornar a aplicação útil.
-   **Backend e Autenticação:** Para uma solução mais robusta, criar um backend (ex: com Node.js/Express ou um serviço como Firebase/Supabase) para armazenar os dados e adicionar autenticação de usuários.
-   **Melhorar Filtros:** Aprimorar a página `TransactionFilters.tsx` para permitir filtragem avançada por data, categoria, etc.
-   **Testes:** Adicionar testes unitários e de integração (ex: com Vitest e React Testing Library) para garantir a estabilidade do código.
-   **Categorias Dinâmicas:** Permitir que o usuário crie, edite e exclua categorias para suas transações. 