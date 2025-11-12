// src/components/ContractEditor/EditorFooter.tsx
import React from 'react';
import { Editor } from '@tiptap/react';

type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';
type EditorFooterProps = { editor: Editor; saveStatus: SaveStatus; };

export const EditorFooter: React.FC<EditorFooterProps> = ({ editor, saveStatus }) => {
  const { characters, words } = editor.storage.characterCount;
  
  return (
    <footer className="bg-white border-t border-gray-200 px-4 flex items-center justify-between fixed bottom-0 left-0 right-0 z-30 h-[41px]">
      <div className="text-xs text-gray-600"> 
        Caracteres: {characters() || 0} • Palavras: {words() || 0} 
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-600"> 
        <span className="flex items-center gap-1.5"> 
          <span className={`w-2 h-2 rounded-full ${getSaveStatusColor(saveStatus)}`}></span> 
          {getSaveStatusText(saveStatus)} 
        </span> 
      </div>
    </footer>
  );
};
// Implementação dos helpers
const getSaveStatusText = (status: SaveStatus) => {
  switch (status) {
    case 'saved': return 'Salvo';
    case 'saving': return 'Salvando...';
    case 'unsaved': return 'Não salvo';
    case 'error': return 'Erro ao salvar';
  }
};
const getSaveStatusColor = (status: SaveStatus) => {
  switch (status) {
    case 'saved': return 'bg-green-500';
    case 'saving': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    case 'unsaved': return 'bg-orange-500';
  }
}