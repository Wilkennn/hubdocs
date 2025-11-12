# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```
hubdocs-frontend
├─ .env
├─ .env.example
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  └─ api.ts
│  ├─ App.tsx
│  ├─ assets
│  ├─ components
│  │  ├─ ContractEditor
│  │  │  ├─ EditorFooter.tsx
│  │  │  ├─ EditorHeader.tsx
│  │  │  ├─ EditorToolbar.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ panels
│  │  │  │  ├─ ClausesPanel.tsx
│  │  │  │  ├─ HistoryPanel.tsx
│  │  │  │  ├─ panel.tsx
│  │  │  │  └─ VariablesPanel.tsx
│  │  │  ├─ SettingsSidebar.tsx
│  │  │  └─ ToolbarButton.tsx
│  │  ├─ layout
│  │  │  ├─ Header.tsx
│  │  │  └─ MainLayout.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  └─ ui
│  │     ├─ Badge.tsx
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ Input.tsx
│  │     ├─ LoadingSpinner.tsx
│  │     ├─ Modal.tsx
│  │     └─ SearchInput.tsx
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ AuthContext.tsx
│  │  │  └─ authService.ts
│  │  ├─ clauses
│  │  ├─ contracts
│  │  │  ├─ components
│  │  │  │  ├─ ContractCard.tsx
│  │  │  │  ├─ CreateContractModal.tsx
│  │  │  │  └─ RenderStatusBadge.tsx
│  │  │  └─ services
│  │  │     └─ contractService.ts
│  │  ├─ documents
│  │  │  ├─ components
│  │  │  └─ services
│  │  │     └─ documentService.tsx
│  │  └─ template
│  │     └─ templateService.ts
│  ├─ hooks
│  │  ├─ useAttachClause.ts
│  │  ├─ useContractClauses.ts
│  │  ├─ useContracts.ts
│  │  ├─ useCreateContract.ts
│  │  ├─ useDocument.ts
│  │  ├─ useDocumentVersions.ts
│  │  ├─ useSaveDocument.ts
│  │  └─ useTiptapEditor.ts
│  ├─ index.css
│  ├─ lib
│  │  ├─ api.ts
│  │  ├─ queryClient.ts
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ mocks
│  ├─ pages
│  │  ├─ ClausesPage.tsx
│  │  ├─ ContractEditorPage.tsx
│  │  ├─ ContractsListPage.tsx
│  │  ├─ DocumentEditPage.tsx
│  │  ├─ LoginPage.tsx
│  │  └─ TemplatesPage.tsx
│  └─ types
│     ├─ auth.types.ts
│     ├─ contract.types.ts
│     ├─ document.types.ts
│     └─ index.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
```
hubdocs-frontend
├─ .env
├─ .env.example
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  └─ api.ts
│  ├─ App.tsx
│  ├─ assets
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ Header.tsx
│  │  │  └─ MainLayout.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  └─ ui
│  │     ├─ BackButton.tsx
│  │     ├─ Badge.tsx
│  │     ├─ Button.tsx
│  │     ├─ Card.tsx
│  │     ├─ Input.tsx
│  │     ├─ LoadingSpinner.tsx
│  │     ├─ Modal.tsx
│  │     └─ SearchInput.tsx
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ AuthContext.tsx
│  │  │  └─ authService.ts
│  │  ├─ clauses
│  │  ├─ contracts
│  │  │  ├─ components
│  │  │  │  ├─ ContractCard.tsx
│  │  │  │  ├─ CreateContractModal.tsx
│  │  │  │  ├─ EditorFooter.tsx
│  │  │  │  ├─ EditorHeader.tsx
│  │  │  │  ├─ EditorTabBar.tsx
│  │  │  │  ├─ EditorToolbar.tsx
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ PageBreakComponent.tsx
│  │  │  │  ├─ panels
│  │  │  │  │  ├─ ClausesPanel.tsx
│  │  │  │  │  ├─ HistoryPanel.tsx
│  │  │  │  │  ├─ panel.tsx
│  │  │  │  │  └─ VariablesPanel.tsx
│  │  │  │  ├─ RenderStatusBadge.tsx
│  │  │  │  ├─ SettingsSidebar.tsx
│  │  │  │  └─ ToolbarButton.tsx
│  │  │  ├─ extensions
│  │  │  │  ├─ AutoPaginationExtension.ts
│  │  │  │  ├─ PageBreakExtension.tsx
│  │  │  │  ├─ PaginationExtension.ts
│  │  │  │  ├─ ResizableImageComponent.tsx
│  │  │  │  └─ ResizableImageExtension.tsx
│  │  │  └─ services
│  │  │     └─ contractService.ts
│  │  ├─ documents
│  │  │  ├─ components
│  │  │  └─ services
│  │  │     └─ documentService.tsx
│  │  └─ template
│  │     └─ templateService.ts
│  ├─ hooks
│  │  ├─ useAttachClause.ts
│  │  ├─ useContractClauses.ts
│  │  ├─ useContracts.ts
│  │  ├─ useCreateContract.ts
│  │  ├─ useDocument.ts
│  │  ├─ useDocumentVersions.ts
│  │  ├─ useSaveDocument.ts
│  │  └─ useTiptapEditor.ts
│  ├─ index.css
│  ├─ lib
│  │  ├─ api.ts
│  │  ├─ queryClient.ts
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ mocks
│  ├─ pages
│  │  ├─ ClausesPage.tsx
│  │  ├─ ContractEditorPage.tsx
│  │  ├─ ContractsListPage.tsx
│  │  ├─ DocumentEditPage.tsx
│  │  ├─ LoginPage.tsx
│  │  └─ TemplatesPage.tsx
│  └─ types
│     ├─ auth.types.ts
│     ├─ contract.types.ts
│     ├─ document.types.ts
│     └─ index.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```