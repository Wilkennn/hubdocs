/**
 * Representa uma versão histórica de um documento.
 */
export interface Version {
  versionId: string;
  timestamp: string;
  htmlContent: string;
}

/**
 * Representa um item no histórico de versões (sem o conteúdo completo).
 */
export interface DocumentVersionHistoryItem {
  id: string;
  timestamp: string;
  documentId: string;
  versionId: number;
  userId?: string;
}

/**
 * Representa um documento editável (Principal ou Anexo).
 */
export interface DocumentData {
  id: string;
  name: string;
  htmlContent: string;
  versions: Version[];
  isAnnex: boolean;
  originalClauseId?: number; // Se for um anexo de uma cláusula
  createdAt?: string;
}

/**
 * Representa um Termo ou Cláusula pré-definida.
 */
export interface Clause {
  id: string;
  title: string;
  content: string;
}

/**
 * Variáveis do documento (ex: {{nome_cliente}}).
 */
export type Variables = Record<string, string>;

/**
 * Props para o componente principal ContractEditor.
 */
export interface ContractEditorProps {
  documents: DocumentData[];
  variables: Variables;
  availableClauses: Clause[];
  onSave: (docId: string, newName: string, newHtmlContent: string) => Promise<boolean>;
  onAttachTerm: (clause: Clause) => Promise<void>;
}

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

export type PanelTab = 'variables' | 'clauses' | 'history';

export type TabBarProps = {
  documents: DocumentData[]; // Alterado de ContractEditorProps['documents']
  activeTabId: string | null; // Permite nulo
  onSelectTab: (id: string) => void;
};

export type EditorHeaderProps = {
  documentName: string;
  onNameChange: (name: string) => void;
  saveStatus: SaveStatus;
  onSave: () => void;
  onExportPdf: () => void;
  onShowSettings: () => void;
  isSettingsOpen: boolean;
  isSaveDisabled: boolean;
};