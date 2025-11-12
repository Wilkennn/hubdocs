import { FileText, CheckCircle, PlusCircle, Library } from 'lucide-react';
import type { Clause, DocumentData } from '@/types';

interface ClausesPanelProps {
  availableClauses: Clause[];
  attachedClauses: DocumentData[];
  onAttachTerm: (clause: Clause) => void;
}

export const ClausesPanel: React.FC<ClausesPanelProps> = ({
  availableClauses,
  attachedClauses,
  onAttachTerm,
}) => {
  return (
    <div className="p-4 space-y-6">
      {/* Attached Clauses */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Termos Anexados
        </h3>

        {attachedClauses.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Nenhum termo anexado</p>
          </div>
        ) : (
          <div className="space-y-2">
            {attachedClauses.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-900 flex-1">{doc.name}</span>
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Clauses */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Termos Disponíveis
        </h3>

        {availableClauses.length === 0 ? (
          <div className="text-center py-8">
            <Library className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Nenhum termo disponível
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {availableClauses.map((clause) => (
              <button
                key={clause.id}
                onClick={() => onAttachTerm(clause)}
                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <PlusCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-900">{clause.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
