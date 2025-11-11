import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CONTRACTS_QUERY_KEY } from './useContracts';
import type { ContractDetails, CreateContractDto } from '../types/contract.types';
import { contractService } from '../features/contracts/services/contractService';


export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation<ContractDetails, Error, CreateContractDto>({
    mutationFn: (data: CreateContractDto) => contractService.createContract(data),
    
    onSuccess: () => {
      // Quando a criação for um sucesso, automaticamente invalide 
      // o cache da lista de contratos. O React Query irá
      // buscar os dados novos sozinho.
      queryClient.invalidateQueries({ queryKey: CONTRACTS_QUERY_KEY });
    },
    // Você também pode adicionar onError, onSettled, etc.
  });
};