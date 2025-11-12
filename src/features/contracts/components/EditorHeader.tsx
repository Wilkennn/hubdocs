import React from 'react';
import {
  FileText,
  Variable,
  Download,
  Save,
  Check,
  X,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { EditorHeaderProps, SaveStatus } from '@/types';
import { BackButton } from '@/components/ui/BackButton';

// 1. Importar a biblioteca
import { useReactToPrint } from 'react-to-print';

// --- Funções de Status (Helpers) ---
const getSaveStatusIcon = (status: SaveStatus) => {
  switch (status) {
    case 'saved':
      return <Check className="w-4 h-4 text-green-600" />;
    case 'saving':
      return (
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      );
    case 'unsaved':
      return <Clock className="w-4 h-4 text-orange-600" />;
    case 'error':
      return <X className="w-4 h-4 text-red-600" />;
  }
};

const getSaveStatusText = (status: SaveStatus) => {
  switch (status) {
    case 'saved':
      return 'Salvo';
    case 'saving':
      return 'Salvando...';
    case 'unsaved':
      return 'Alterações não salvas';
    case 'error':
      return 'Erro ao salvar';
  }
};

// Interface Estendida (caso não possa editar o types.ts agora)
interface ExtendedEditorHeaderProps extends EditorHeaderProps {
  printContentRef: React.RefObject<HTMLDivElement | null>; // <--- Nova prop obrigatória
}

// --- Componente Principal ---
export const EditorHeader: React.FC<ExtendedEditorHeaderProps> = ({
  documentName,
  onNameChange,
  saveStatus,
  onSave,
  onShowSettings,
  isSettingsOpen,
  isSaveDisabled,
  printContentRef, // <--- Recebendo a referência do Pai
}) => {
  
  /**
   * 2. Configuração do React-to-Print
   * Agora a lógica de impressão vive aqui no header,
   * mas imprime o conteúdo referenciado no printContentRef.
   */
  const handlePrint = useReactToPrint({
    contentRef: printContentRef,
    documentTitle: documentName || 'Documento',
    onAfterPrint: () => {
      console.log('Impressão finalizada');
    },
  });

  return (
    // Adicionei 'no-print' para garantir que o header nunca saia na impressão
    <header className="bg-white border-b border-gray-200 h-[65px] no-print">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Lado Esquerdo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <BackButton />
          <div className="p-2 flex-shrink-0" title={documentName}>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <input
              type="text"
              value={documentName}
              onChange={(e) => onNameChange(e.target.value)}
              className="text-sm font-semibold text-gray-900 border-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-48"
              placeholder="Nome do Documento"
            />
            <div className="flex items-center gap-1.5 px-2 text-xs text-gray-600">
              {getSaveStatusIcon(saveStatus)}
              <span>{getSaveStatusText(saveStatus)}</span>
            </div>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            onClick={onShowSettings}
            className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              isSettingsOpen ? 'bg-primary/10 text-primary' : 'text-gray-700'
            }`}
          >
            <Variable className="w-4 h-4" /> Configurações
          </Button>

          {/* Botão de PDF/Impressão com react-to-print */}
          <Button
            variant="ghost"
            onClick={() => handlePrint()}
            className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-100"
          >
            <Download className="w-4 h-4" /> PDF / Imprimir
          </Button>

          <Button
            onClick={onSave}
            disabled={isSaveDisabled}
            className="px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Salvar
          </Button>
        </div>
      </div>
    </header>
  );
};