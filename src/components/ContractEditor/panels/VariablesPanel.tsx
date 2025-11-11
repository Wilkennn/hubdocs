// src/components/ContractEditor/panels/VariablesPanel.tsx
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Plus, X } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

type VariablesPanelProps = {
  editor: Editor;
  variables: { [key: string]: string };
  setVariables: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onUnsavedChange: () => void;
};

export const VariablesPanel: React.FC<VariablesPanelProps> = ({ 
  editor, variables, setVariables, onUnsavedChange
}) => {
  const [newVarName, setNewVarName] = useState('');

  const insertVariable = (variableName: string) => { 
    editor.chain().focus().insertContent(`{{${variableName}}}`).run(); 
  };
  
  const handleVariableChange = (key: string, value: string) => { 
    setVariables(prev => ({ ...prev, [key]: value })); 
    onUnsavedChange();
  };
  
  const handleAddNewVariable = () => {
    const key = newVarName.trim().replace(/\s+/g, '_').toLowerCase();
    if (!key) return alert('Por favor, digite um nome para a variável.');
    if (variables.hasOwnProperty(key)) return alert('Esta variável já existe.');
    setVariables(prev => ({ ...prev, [key]: '' })); 
    setNewVarName('');
  };
  
  const handleDeleteVariable = (key: string) => {
    if (window.confirm(`Tem certeza que quer deletar a variável "{{${key}}}"?`)) {
      setVariables(prev => { const n = { ...prev }; delete n[key]; return n; });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2"> 
        <h3 className="text-sm font-medium text-gray-900 mb-2">Adicionar Nova Variável</h3> 
        <div className="flex gap-2"> 
          <Input 
            type="text" 
            placeholder="ex: nome_empresa" 
            value={newVarName} 
            onChange={(e) => setNewVarName(e.target.value)} 
            className="w-full text-sm"
          /> 
          <Button 
            onClick={handleAddNewVariable} 
            className="flex-shrink-0" 
            title="Adicionar"
          >
            <Plus className="w-4 h-4" />
          </Button> 
        </div> 
        <p className="text-xs text-gray-400 mt-1">Espaços serão convertidos para _</p>
      </div>
      <div className="pt-4 border-t border-gray-200"> 
        <h3 className="text-sm font-medium text-gray-900 mb-2">Variáveis do Contrato</h3> 
        <div className="space-y-4"> 
          {Object.keys(variables).length === 0 && (<p className="text-sm text-gray-500">Nenhuma variável adicionada.</p>)} 
          {Object.entries(variables).map(([key, value]) => (
            <div key={key}> 
              <div className="flex justify-between items-center mb-1"> 
                <label className="block text-sm font-medium text-gray-700">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} <span className="text-xs text-gray-400 font-mono ml-2">{`{{${key}}}`}</span></label> 
                <button onClick={() => handleDeleteVariable(key)} className="p-1 text-gray-400 hover:text-red-500 rounded" title="Deletar variável"><X className="w-3 h-3" /></button> 
              </div> 
              <Input 
                type="text" 
                value={value} 
                onChange={(e) => handleVariableChange(key, e.target.value)} 
                className="w-full text-sm"
              /> 
              <button onClick={() => insertVariable(key)} className="mt-1 text-xs text-primary hover:text-primary-600 flex items-center gap-1"><Plus className="w-3 h-3" /> Inserir no documento</button> 
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
};