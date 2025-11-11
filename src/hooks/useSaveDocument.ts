// src/features/documents/hooks/useSaveDocument.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentQueryKey } from './useDocument';
import { documentVersionsQueryKey } from './useDocumentVersions';
import { documentService } from '../features/documents/services/documentService';


export const useSaveDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, htmlContent }: { id: string; name: string; htmlContent: string }) =>
      documentService.saveDocumentVersion(id, { name, htmlContent }),
    
    // Invalidação automática!
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: documentVersionsQueryKey(variables.id) });
      queryClient.invalidateQueries({ queryKey: documentQueryKey(variables.id) });
    },
  });
};