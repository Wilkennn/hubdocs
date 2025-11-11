// src/components/ContractEditor/panels/ClausesPanel.tsx
import React from 'react';
import { Plus, FileText, CheckCircle } from 'lucide-react';
import type { Clause, DocumentData } from '../../../types/contract.types';

type ClausesPanelProps = {
  availableClauses: Clause[];
  attachedClauses: DocumentData[]; // Recebe DocumentData[]
  onAttachTerm: (clause: Clause) => void; 
};

export const ClausesPanel: React.FC<ClausesPanelProps> = ({ 
  availableClauses, 
  attachedClauses,
  onAttachTerm 
}) => {
  return (
    <div className="p-4 space-y-6">
      
      {/* Lista 1: Termos Anexados (renderiza DocumentData) */}
      <div className="pt-2"> 
        <h3 className="text-sm font-medium text-gray-900 mb-3">Termos Anexados</h3>
        <div className="space-y-2">
          {attachedClauses.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-2">
              Nenhum termo foi anexado a este contrato.
            </p>
          ) : (
            attachedClauses.map((doc) => (
              <div 
                key={doc.id} 
                className="w-full text-left p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-3"
              >
                <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1">{doc.name}</span>
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lista 2: Termos Disponíveis (renderiza Clause) */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Adicionar Termos (Anexos)</h3> 
        <div className="space-y-2"> 
          {availableClauses.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-2">
              Não há mais termos disponíveis para adicionar.
            </p>
          ) : (
            availableClauses.map((clause) => (
              <button 
                key={clause.id} 
                onClick={() => onAttachTerm(clause)} 
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 flex items-center gap-3 transition-colors" 
                title="Clique para anexar este termo ao contrato"
              >
                <Plus className="w-4 h-4 text-primary flex-shrink-0" /> 
                <span className="text-sm text-gray-700">{clause.title}</span>
              </button>
            ))
          )} 
        </div>
      </div>
    </div>
  );
};