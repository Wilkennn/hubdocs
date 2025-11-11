import { useQuery } from '@tanstack/react-query';
import { documentService } from '../features/documents/services/documentService';

export const documentQueryKey = (docId: string) => ['document', docId];

export const useDocument = (docId: string) => {
  return useQuery({
    queryKey: documentQueryKey(docId),
    queryFn: () => documentService.getDocumentById(docId),
    enabled: !!docId, // Só executa a query se o docId existir
  });
};