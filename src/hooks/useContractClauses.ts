import { useQuery } from '@tanstack/react-query';
import type { Clause } from '../types/contract.types';
import { contractService } from '../features/contracts/services/contractService';

export const useContractClauses = (contractId: string) => {
  return useQuery<Clause[], Error>({
    queryKey: ['contractClauses', contractId],
    queryFn: () => contractService.getAvailableClauses(contractId),
    enabled: !!contractId,
  });
};