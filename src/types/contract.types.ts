// src/types/contract.types.ts

// --- Tipos de Entidade ---

/**
 * Representa uma versão histórica de um documento.
 */
export interface Version {
  versionId: string;
  timestamp: string;
  htmlContent: string;
}

/**
 * Representa um Termo ou Cláusula pré-definida (disponível para anexar).
 */
export interface Clause {
  id: string;
  title: string;
  content: string;
}

/**
 * Representa um documento editável
 * (Seja o Principal ou um Anexo)
 */
export interface DocumentData {
  id: string;
  name: string;
  htmlContent: string;
  versions: Version[];
  isAnnex: boolean; // Para sabermos se é um anexo
}

/**
 * Representa um contrato na lista (visão resumida).
 */
export interface ContractListItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  status: 'active' | 'draft' | 'expired';
}

// --- Tipos de Props ---

/**
 * Props para o componente principal ContractEditor.
 */
export interface ContractEditorProps {
  // Lista de documentos (Principal + Anexos)
  documents: DocumentData[]; 
  
  // Lista de cláusulas que podem ser adicionadas
  availableClauses: Clause[];
  
  // Variáveis do contrato
  variables: { [key: string]: string };

  // Funções de Callback (simuladas)
  onAttachTerm: (clause: Clause) => Promise<void>;
  onSave: (documentId: string, newName: string, newHtmlContent: string) => Promise<boolean>;
}