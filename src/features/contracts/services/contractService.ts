import { api } from '../../../api/api'; 
import {
  type ContractListItem,
  type ContractDetails,
  type CreateContractDto,
  type UpdateContractDto,
  type Clause,
} from '../../../types/contract.types';
import { type Document } from '../../../types/document.types';

const SERVICE_NAME = "[ContractService]"; // Prefixo para os logs

/**
 * [READ] Busca todos os contratos do usuário logado.
 */
const getContracts = async (): Promise<ContractListItem[]> => {
  console.log(`${SERVICE_NAME} Iniciando busca de contratos.`);
  try {
    const response = await api.get<ContractListItem[]>('/contracts');
    console.log(`${SERVICE_NAME} Sucesso ao buscar contratos:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao buscar contratos:`, error);
    throw error; // Propaga o erro para o React Query/hook
  }
};

/**
 * [READ] Busca os detalhes completos de um contrato específico.
 */
const getContractById = async (id: number): Promise<ContractDetails> => {
  console.log(`${SERVICE_NAME} Iniciando busca por contrato ID: ${id}`);
  try {
    const response = await api.get<ContractDetails>(`/contracts/${id}`);
    console.log(`${SERVICE_NAME} Sucesso ao buscar contrato ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao buscar contrato ${id}:`, error);
    throw error;
  }
};

/**
 * [CREATE] Cria um novo contrato e seu documento principal.
 */
const createContract = async (data: CreateContractDto): Promise<ContractDetails> => {
  console.log(`${SERVICE_NAME} Iniciando criação de contrato:`, data);
  try {
    const response = await api.post<ContractDetails>('/contracts', data);
    console.log(`${SERVICE_NAME} Sucesso ao criar contrato:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao criar contrato:`, error);
    throw error;
  }
};

/**
 * [UPDATE] Atualiza os dados de um contrato (ex: nome).
 */
const updateContract = async (id: number, data: UpdateContractDto): Promise<ContractDetails> => {
  console.log(`${SERVICE_NAME} Iniciando atualização do contrato ID ${id}:`, data);
  try {
    const response = await api.patch<ContractDetails>(`/contracts/${id}`, data);
    console.log(`${SERVICE_NAME} Sucesso ao atualizar contrato ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao atualizar contrato ${id}:`, error);
    throw error;
  }
};

/**
 * [DELETE] Remove um contrato.
 */
const deleteContract = async (id: number): Promise<ContractListItem> => {
  console.log(`${SERVICE_NAME} Iniciando deleção do contrato ID: ${id}`);
  try {
    const response = await api.delete<ContractListItem>(`/contracts/${id}`);
    console.log(`${SERVICE_NAME} Sucesso ao deletar contrato ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao deletar contrato ${id}:`, error);
    throw error;
  }
};

/**
 * [AÇÃO] Anexa uma cláusula como um novo documento (anexo) a um contrato.
 */
const attachClauseAsAnnex = async (contractId: number, clauseId: number): Promise<Document> => {
  console.log(`${SERVICE_NAME} Iniciando anexo de cláusula ${clauseId} ao contrato ${contractId}`);
  try {
    const response = await api.post<Document>(
      `/contracts/${contractId}/attach-clause`, 
      { clauseId } 
    );
    console.log(`${SERVICE_NAME} Sucesso ao anexar cláusula:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao anexar cláusula ${clauseId} ao contrato ${contractId}:`, error);
    throw error;
  }
};

/**
 * [READ] Busca as cláusulas/termos disponíveis para um contrato.
 */
const getAvailableClauses = async (contractId: string): Promise<Clause[]> => {
  console.log(`${SERVICE_NAME} Iniciando busca de cláusulas disponíveis para o contrato ID: ${contractId}`);
  try {
    const response = await api.get<Clause[]>(`/contracts/${contractId}/available-clauses`);
    console.log(`${SERVICE_NAME} Sucesso ao buscar cláusulas disponíveis:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${SERVICE_NAME} Falha ao buscar cláusulas disponíveis para o contrato ID ${contractId}:`, error);
    throw error;
  }
};

export const contractService = {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  attachClauseAsAnnex,
  getAvailableClauses,
};