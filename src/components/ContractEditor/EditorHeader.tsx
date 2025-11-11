// src/components/ContractEditor/EditorHeader.tsx
import React from 'react';
import { FileText, Variable, Download, Save, Check, X, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

type EditorHeaderProps = {
  documentName: string;
  onNameChange: (name: string) => void;
  saveStatus: SaveStatus;
  onSave: () => void;
  onExportPdf: () => void;
  onShowSettings: () => void;
  isSettingsOpen: boolean;
  isSaveDisabled: boolean;
};

const getSaveStatusIcon = (status: SaveStatus) => {
  switch (status) {
    case 'saved': return <Check className="w-4 h-4 text-green-600" />;
    case 'saving': return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
    case 'unsaved': return <Clock className="w-4 h-4 text-orange-600" />;
    case 'error': return <X className="w-4 h-4 text-red-600" />;
  }
};

const getSaveStatusText = (status: SaveStatus) => {
  switch (status) {
    case 'saved': return 'Salvo';
    case 'saving': return 'Salvando...';
    case 'unsaved': return 'Alterações não salvas';
    case 'error': return 'Erro ao salvar';
  }
};

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  documentName, onNameChange, saveStatus, onSave,
  onExportPdf, onShowSettings, isSettingsOpen, isSaveDisabled,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 h-[65px]">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="p-2 flex-shrink-0" title={documentName}><FileText className="w-5 h-5 text-primary" /></div>
          <div>
            <input 
              type="text" 
              value={documentName} 
              onChange={(e) => onNameChange(e.target.value)} 
              className="text-sm font-semibold text-gray-900 border-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-48"
            />
            <div className="flex items-center gap-1.5 px-2 text-xs text-gray-600"> 
              {getSaveStatusIcon(saveStatus)} 
              <span>{getSaveStatusText(saveStatus)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button 
            variant="ghost" // Assumindo variantes
            onClick={onShowSettings} 
            className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
              isSettingsOpen ? 'bg-primary/10 text-primary' : 'text-gray-700'
            }`}
          >
            <Variable className="w-4 h-4" /> Configurações
          </Button>
          <Button 
            variant="ghost" 
            onClick={onExportPdf} 
            className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> PDF
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