// src/components/ContractEditor/SettingsSidebar.tsx
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { X, Variable, Library, History } from 'lucide-react';
import { VariablesPanel } from './panels/VariablesPanel';
import { ClausesPanel } from './panels/ClausesPanel';
import { HistoryPanel } from './panels/HistoryPanel';
import { type Clause, type Version, type DocumentData } from '../../types/contract.types';

type PanelTab = 'variables' | 'clauses' | 'history';

type SettingsSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor;
  documentName: string;
  variables: { [key: string]: string };
  setVariables: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onUnsavedChange: () => void;
  versions: Version[]; // Versões do documento ATIVO
  availableClauses: Clause[];
  attachedClauses: DocumentData[]; // Anexos são DocumentData
  onAttachTerm: (clause: Clause) => void;
};

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  isOpen, onClose, editor, documentName, variables, setVariables,
  onUnsavedChange, availableClauses, attachedClauses, onAttachTerm, versions,
}) => {
  const [panelTab, setPanelTab] = useState<PanelTab>('variables');

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 flex flex-col">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between"> 
            <h2 className="font-semibold text-gray-900">Configurações</h2> 
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" title="Fechar painel"><X className="w-4 h-4" /></button> 
          </div>
          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex gap-4">
              <button onClick={() => setPanelTab('variables')} className={`pb-2 px-1 text-sm font-medium flex items-center gap-1.5 ${panelTab === 'variables' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}> <Variable className="w-4 h-4" /> Variáveis </button>
              <button onClick={() => setPanelTab('clauses')} className={`pb-2 px-1 text-sm font-medium flex items-center gap-1.5 ${panelTab === 'clauses' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}> <Library className="w-4 h-4" /> Termos </button>
              <button onClick={() => setPanelTab('history')} className={`pb-2 px-1 text-sm font-medium flex items-center gap-1.5 ${panelTab === 'history' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'}`}> <History className="w-4 h-4" /> Histórico </button>
            </nav>
          </div>
        </div>
        
        {/* Conteúdo das Abas */}
        <div className="flex-1 overflow-y-auto">
          {panelTab === 'variables' && (
            <VariablesPanel 
              editor={editor} 
              variables={variables} 
              setVariables={setVariables} 
              onUnsavedChange={onUnsavedChange} 
            />
          )}
          {panelTab === 'clauses' && (
            <ClausesPanel 
              availableClauses={availableClauses} 
              attachedClauses={attachedClauses} // Passa DocumentData[]
              onAttachTerm={onAttachTerm} 
            />
          )}
          {panelTab === 'history' && (
            <HistoryPanel 
              documentName={documentName} // Passa o nome do doc ativo
              versions={versions} // Passa as versões do doc ativo
            />
          )}
        </div>
      </div>
    </>
  );
};