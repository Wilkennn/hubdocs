import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contractService } from '../features/contracts/services/contractService';

export const useAttachClause = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contractId, clauseId }: { contractId: string; clauseId: number }) =>
      contractService.attachClauseAsAnnex(Number(contractId), clauseId),
    
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contract', variables.contractId] });
      alert('Termo anexado com sucesso!');
    },
    onError: (err: Error) => {
      alert(`Falha ao anexar termo: ${err.message}`);
    }
  });
};