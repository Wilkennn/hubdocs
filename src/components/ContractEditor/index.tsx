// src/components/ContractEditor/index.tsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { EditorContent } from '@tiptap/react';
import { EditorHeader } from './EditorHeader';
import { EditorToolbar } from './EditorToolbar';
import { EditorFooter } from './EditorFooter';
import { SettingsSidebar } from './SettingsSidebar';
import { useTiptapEditor } from '../../hooks/useTiptapEditor';
import { 
  type ContractEditorProps,
  type Clause,
  type Version,
  type DocumentData // Importado para o componente de abas
} from '../../types/contract.types';
import { FileText, GripVertical } from 'lucide-react';

export type { Clause, Version };
type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

// --- Componente de Abas (interno) ---
type TabBarProps = {
  documents: DocumentData[]; // Alterado de ContractEditorProps['documents']
  activeTabId: string | null; // Permite nulo
  onSelectTab: (id: string) => void;
};

const EditorTabBar: React.FC<TabBarProps> = ({ documents, activeTabId, onSelectTab }) => {
  return (
    <nav className="flex items-center border-b border-gray-200 bg-gray-50 px-4 overflow-x-auto">
      {documents.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onSelectTab(doc.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2
            ${activeTabId === doc.id
              ? 'border-primary text-primary bg-white'
              : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
          {!doc.isAnnex ? (
            <FileText className="w-4 h-4" />
          ) : (
            <GripVertical className="w-4 h-4 text-gray-400" />
          )}
          {doc.name}
        </button>
      ))}
    </nav>
  );
};
// -----------------------------------------

export const ContractEditor: React.FC<ContractEditorProps> = ({ 
  documents,
  variables: initialVariables, 
  availableClauses,
  onAttachTerm,
  onSave,
}) => {
  
  // --- Estados Principais ---
  
  // CORREÇÃO 1: (Esta era a linha 61)
  // Inicializa com o ID do primeiro documento, ou nulo se a lista estiver vazia
  const [activeTabId, setActiveTabId] = useState<string | null>(documents?.[0]?.id || null);
  
  const [showVariablesPanel, setShowVariablesPanel] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  
  // CORREÇÃO 2: Garante que 'activeDocument' pode ser nulo
  const activeDocument = useMemo(() => {
    return documents.find(d => d.id === activeTabId) || documents[0] || null;
  }, [documents, activeTabId]);

  const [documentName, setDocumentName] = useState(activeDocument?.name || '');
  const [variables, setVariables] = useState(initialVariables);
  
  // CORREÇÃO 3: Lida com 'activeDocument' nulo
  const editor = useTiptapEditor({
    initialContent: activeDocument?.htmlContent || '',
    dependency: activeDocument?.id || null, // Recria o editor ao mudar de aba
    onUpdate: () => setSaveStatus('unsaved'),
  });
  
  // --- Callbacks e Lógica ---
  const handleSave = useCallback(async () => {
    if (!editor || saveStatus === 'saving' || !activeDocument) return; // Guarda
    setSaveStatus('saving');
    try {
      const success = await onSave(activeDocument.id, documentName, editor.getHTML());
      if (success) {
        setSaveStatus('saved');
        editor.commands.blur();
      } else { throw new Error("Falha no onSave"); }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setSaveStatus('error');
      alert("Erro ao salvar o documento.");
    }
  }, [editor, onSave, activeDocument, documentName, saveStatus]); // Adicionado activeDocument

  // Efeito de Auto-Save
  useEffect(() => {
    if (saveStatus === 'unsaved' && editor) {
      const timer = setTimeout(handleSave, 3000); 
      return () => clearTimeout(timer);
    }
  }, [saveStatus, editor, handleSave]);

  useEffect(() => { setVariables(initialVariables); }, [initialVariables]);
  
  // CORREÇÃO 4: Lida com 'activeDocument' nulo
  useEffect(() => {
    if (activeDocument) {
      setDocumentName(activeDocument.name);
      if (editor && activeDocument.htmlContent !== editor.getHTML()) {
        editor.commands.setContent(activeDocument.htmlContent, false);
      }
    }
    setSaveStatus('saved');
  }, [activeDocument, editor]);

  const handleExportPdf = () => alert(`Exportação de PDF para o documento: ${documentName}`);
  
  // Guarda de segurança caso o Tiptap ainda não tenha carregado
  if (!editor) { return <div>Carregando editor...</div>; }
  
  // Guarda de segurança caso os documentos mockados falhem (como no seu erro)
  if (!activeDocument) {
    return <div>Erro: Não foi possível carregar o documento ativo.</div>
  }

  const headerHeight = '113px';
  const tabBarHeight = '45px';
  const footerHeight = '41px'; 

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ 
      paddingTop: `calc(${headerHeight} + ${tabBarHeight})`, 
      paddingBottom: footerHeight 
    }}>
      
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <EditorHeader
          documentName={documentName}
          onNameChange={(name) => { setDocumentName(name); setSaveStatus('unsaved'); }}
          saveStatus={saveStatus}
          onSave={handleSave}
          onExportPdf={handleExportPdf}
          onShowSettings={() => setShowVariablesPanel(true)}
          isSettingsOpen={showVariablesPanel}
          isSaveDisabled={saveStatus === 'saved' || saveStatus === 'saving'}
        />
        <EditorToolbar editor={editor} />
        
        <EditorTabBar 
          documents={documents}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
        />
      </div>
      
      <main className="w-full max-w-none px-[8%] py-12 bg-white">
        <EditorContent editor={editor} />
      </main>

      <SettingsSidebar
        isOpen={showVariablesPanel}
        onClose={() => setShowVariablesPanel(false)}
        editor={editor}
        documentName={documentName}
        variables={variables}
        setVariables={setVariables}
        onUnsavedChange={() => setSaveStatus('unsaved')}
        versions={activeDocument.versions}
        availableClauses={availableClauses}
        attachedClauses={documents.filter(d => d.isAnnex)}
        onAttachTerm={onAttachTerm}
      />

      <EditorFooter editor={editor} saveStatus={saveStatus} />
    </div>
  );
};