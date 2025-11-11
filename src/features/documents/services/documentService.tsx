// Caminho de importação como no seu arquivo
import { api } from "../../../api/api"; 
import type { DocumentData, Version } from "../../../types/contract.types";

type FetchedDocument = {
  document: DocumentData;
  variables: { [key: string]: string };
};

const SERVICE_NAME = "[DocumentService]";

/**
 * [READ] Busca os detalhes de um documento (conteúdo + variáveis).
 */
const getDocumentById = async (id: string): Promise<FetchedDocument> => {
  console.log(`${SERVICE_NAME} Iniciando busca por documento ID: ${id}`);
  try {
    const response = await api.get<FetchedDocument>(`/documents/${id}`);
    console.log(`${SERVICE_NAME} Sucesso ao buscar documento ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Erro ao buscar documento ID ${id}:`, error);
    throw error; // Re-lança o erro para o React Query
  }
};

/**
 * [READ] Busca o histórico de versões de um documento.
 */
const getDocumentVersions = async (id: string): Promise<Version[]> => {
  console.log(`${SERVICE_NAME} Iniciando busca de versões para o doc ID: ${id}`);
  try {
    const response = await api.get<Version[]>(`/documents/${id}/versions`);
    console.log(`${SERVICE_NAME} Sucesso ao buscar versões do doc ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Erro ao buscar versões do doc ID ${id}:`, error);
    throw error; // Re-lança o erro
  }
};

/**
 * [UPDATE] Salva uma nova versão de um documento.
 */
const saveDocumentVersion = async (
  id: string, 
  data: { name: string; htmlContent: string }
): Promise<Version> => {
  // Evita logar o 'htmlContent' inteiro, que é muito grande
  console.log(`${SERVICE_NAME} Iniciando salvamento da versão para o doc ID: ${id} (Nome: ${data.name})`);
  try {
    const response = await api.put<Version>(`/documents/${id}`, data);
    console.log(`${SERVICE_NAME} Sucesso ao salvar versão do doc ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Erro ao salvar versão do doc ID ${id}:`, error);
    throw error; // Re-lança o erro
  }
};

export const documentService = {
  getDocumentById,
  getDocumentVersions,
  saveDocumentVersion,
};