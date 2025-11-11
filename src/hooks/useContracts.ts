// src/features/contracts/hooks/useContracts.ts
import { useQuery } from '@tanstack/react-query';
import type { ContractListItem } from '../types/contract.types';
import { contractService } from '../features/contracts/services/contractService';


export const CONTRACTS_QUERY_KEY = ['contracts'];

export const useContracts = () => {
  return useQuery<ContractListItem[], Error>({
    queryKey: CONTRACTS_QUERY_KEY,
    queryFn: () => contractService.getContracts(),
    // ... (outras opções como 'staleTime', 'refetchOnWindowFocus', etc.)
  });
};