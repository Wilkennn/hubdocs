// src/features/editor/components/SettingsSidebar.tsx

import React, { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { X, Variable, Library, History as HistoryIcon } from 'lucide-react';

import { VariablesPanel } from './panels/VariablesPanel';
import { ClausesPanel } from './panels/ClausesPanel';
import { HistoryPanel } from './panels/HistoryPanel';
import type { DocumentData, Clause, PanelTab, Variables, Version } from '@/types';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor  | null;
  documentName: string;
  variables: Variables;
  setVariables: React.Dispatch<React.SetStateAction<Variables>>;
  onUnsavedChange: () => void;
  versions: Version[];
  availableClauses: Clause[];
  attachedClauses: DocumentData[];
  onAttachTerm: (clause: Clause) => void;
}

const TABS = [
  { id: 'variables' as const, label: 'Variáveis', icon: Variable },
  { id: 'clauses' as const, label: 'Termos', icon: Library },
  { id: 'history' as const, label: 'Histórico', icon: HistoryIcon },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  isOpen,
  onClose,
  editor,
  documentName,
  variables,
  setVariables,
  onUnsavedChange,
  versions,
  availableClauses,
  attachedClauses,
  onAttachTerm,
}) => {
  const [activeTab, setActiveTab] = useState<PanelTab>('variables');

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 border-b border-gray-200 -mb-px">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'variables' && (
            <VariablesPanel
              editor={editor}
              variables={variables}
              setVariables={setVariables}
              onUnsavedChange={onUnsavedChange}
            />
          )}

          {activeTab === 'clauses' && (
            <ClausesPanel
              availableClauses={availableClauses}
              attachedClauses={attachedClauses}
              onAttachTerm={onAttachTerm}
            />
          )}

          {activeTab === 'history' && (
            <HistoryPanel documentName={documentName} versions={versions} />
          )}
        </div>
      </aside>
    </>
  );
};
