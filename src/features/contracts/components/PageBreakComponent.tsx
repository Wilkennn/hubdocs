// components/PageBreakComponent.tsx
import React from 'react';
import type { NodeViewProps } from '@tiptap/react';

// Usando a interface correta do TipTap
interface PageBreakComponentProps extends NodeViewProps {
  // Props adicionais podem ser adicionadas aqui se necessário
}

export const PageBreakComponent: React.FC<PageBreakComponentProps> = ({ 
  node, 
  selected, 
  editor, 
  getPos,
  extension
}) => {
  const handleClick = () => {
    // Foca no editor e seleciona a quebra de página quando clicada
    if (editor && getPos) {
      editor.commands.focus();
      editor.commands.setNodeSelection(getPos());
    }
  };

  return (
    <div
      data-type="page-break"
      data-id={node.attrs.id}
      className={`
        page-break-element 
        my-8 py-4 border-t-2 border-b-2 border-dashed border-gray-300 
        relative cursor-pointer
        ${selected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'}
      `}
      onClick={handleClick}
      contentEditable={false} // Importante: marca como não editável
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="bg-white px-4 text-sm text-gray-500 font-medium uppercase tracking-wide">
          Quebra de Página
        </span>
      </div>
      
      {/* Indicador de seleção */}
      {selected && (
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};