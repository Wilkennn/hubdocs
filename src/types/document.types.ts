/**
 * Representa um item no histórico de versões,
 * conforme retornado pelo endpoint GET /documents/:id/versions.
 * (Note a ausência de 'htmlContent' para maior eficiência).
 */
export type DocumentVersionHistoryItem = {
  id: string;
  timestamp: string; // O JSON serializa datas como strings
  documentId: string;
  versionId: number; // O campo numérico que implementamos
  // userId?: string; // Se você o adicionou ao 'select'
};

// src/types/document.types.ts

/**
 * Representa um documento (principal ou anexo) 
 * retornado como parte de um contrato.
 */
export interface Document {
  id: string;
  name: string;
  isAnnex: boolean;
  originalClauseId?: number; // Se for um anexo de uma cláusula
  createdAt: string;
  // O htmlContent completo pode ou não vir aqui, dependendo da API
  // Se for muito pesado, a API 'GET /contracts/:id' pode omiti-lo.
}
