// src/components/ContractEditor/panels/HistoryPanel.tsx
import React from 'react';
import type { Version } from '../../../types/contract.types';

type HistoryPanelProps = {
  documentName: string;
  versions: Version[];
};

const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ documentName, versions }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h3 className="text-sm font-medium text-gray-900 mb-2"> Histórico ({documentName}) </h3>
        {versions.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma versão salva para este documento.</p>
        ) : (
          <ul className="space-y-2">
            {versions.map((version, index) => (
              <li key={version.versionId} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <span>Versão {versions.length - index}{index === 0 ? ' (Atual)' : ''}</span> 
                  <span>{formatTimestamp(version.timestamp)}</span>
                </div>
                {/* <Button variant="outline" size="sm" className="mt-1 text-xs">Visualizar</Button> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};