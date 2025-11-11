import { useQuery } from '@tanstack/react-query';
import { documentService } from '../features/documents/services/documentService';

export const documentVersionsQueryKey = (docId: string) => ['documentVersions', docId];

export const useDocumentVersions = (docId: string) => {
  return useQuery({
    queryKey: documentVersionsQueryKey(docId),
    queryFn: () => documentService.getDocumentVersions(docId),
    enabled: !!docId,
  });
};