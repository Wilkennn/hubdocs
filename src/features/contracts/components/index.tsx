import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { EditorContent } from '@tiptap/react';

// Hooks e Tipos
import { useTiptapEditor } from '@/hooks/useTiptapEditor';
import type { ContractEditorProps, SaveStatus } from '@/types';

// Extensões
import { ResizableImageExtension } from '../extensions/ResizableImageExtension';

import { EditorHeader } from './EditorHeader';
import { EditorFooter } from './EditorFooter';
import { EditorTabBar } from './EditorTabBar';
import { EditorToolbar } from './EditorToolbar';
import { SettingsSidebar } from './SettingsSidebar';



export const ContractEditor: React.FC<ContractEditorProps> = ({
  documents,
  variables: initialVariables,
  availableClauses,
  onAttachTerm,
  onSave,
}) => {
  // --- 1. Gerenciamento de Estado ---
  const [activeTabId, setActiveTabId] = useState<string | null>(
    () => documents?.[0]?.id || null,
  );
  const [showVariablesPanel, setShowVariablesPanel] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [documentName, setDocumentName] = useState('');

  const [editorHeight, setEditorHeight] = useState(0);
  const editorContentRef = useRef<HTMLDivElement>(null);

  const activeDocument = useMemo(() => {
    if (!documents || documents.length === 0) return null;
    return documents.find((d) => d.id === activeTabId) || documents[0];
  }, [documents, activeTabId]);

  const [variables, setVariables] = useState(initialVariables);

  const printContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDocument) {
      setDocumentName(activeDocument.name);
      if (!activeTabId) {
        setActiveTabId(activeDocument.id);
      }
    }
  }, [activeDocument, activeTabId]);

  // --- 2. Configuração do Editor (Drag & Drop e Extensões) ---
  const editorProps = useMemo(
    () => ({
      attributes: {
        class: 'focus:outline-none',
      },
      handleDrop: (view: any, event: any, _slice: any, moved: boolean) => {
        if (
          moved ||
          !event.dataTransfer ||
          !event.dataTransfer.files ||
          event.dataTransfer.files.length === 0
        ) {
          return false;
        }
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          event.preventDefault();
          const reader = new FileReader();
          reader.onload = (e) => {
            const src = e.target?.result as string;
            if (src) {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              const pos = coordinates
                ? coordinates.pos
                : view.state.selection.from;
              const transaction = view.state.tr.insert(
                pos,
                schema.nodes.image.create({ src, width: '70%' }),
              );
              view.dispatch(transaction);
            }
          };
          reader.readAsDataURL(file);
          return true;
        }
        return false;
      },
    }),
    [],
  );

  const editor = useTiptapEditor({
    initialContent: activeDocument?.htmlContent || '',
    dependency: activeDocument?.id || null,
    onUpdate: () => setSaveStatus('unsaved'),
    editorProps: editorProps,
    extensions: [ResizableImageExtension],
  });

  // --- Efeito para Medir a Altura do Editor ---
  useEffect(() => {
    if (!editor) return;

    // Função que mede o .ProseMirror
    const measureHeight = () => {
      const proseMirrorNode = editorContentRef.current?.querySelector<HTMLElement>('.ProseMirror');
      if (proseMirrorNode) {
        setEditorHeight(proseMirrorNode.scrollHeight);
      }
    };

    // Mede na inicialização
    measureHeight();

    // Registra listeners para medir em tempo real
    editor.on('update', measureHeight);
    editor.on('selectionUpdate', measureHeight);

    // Limpa os listeners ao desmontar
    return () => {
      editor.off('update', measureHeight);
      editor.off('selectionUpdate', measureHeight);
    };
  }, [editor]);

  // --- 3. Ações e Callbacks ---
  const handleSave = useCallback(async () => {
    if (!editor || saveStatus === 'saving' || !activeDocument) return;

    setSaveStatus('saving');
    try {
      const success = await onSave(
        activeDocument.id,
        documentName,
        editor.getHTML(),
      );
      if (success) {
        setSaveStatus('saved');
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      console.error('Erro no salvamento:', error);
      setSaveStatus('error');
    }
  }, [editor, onSave, activeDocument, documentName, saveStatus]);

  // Auto-Save (3 segundos de debounce)
  useEffect(() => {
    if (saveStatus === 'unsaved') {
      const timer = setTimeout(handleSave, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus, handleSave]);

  const handleExportPdf = () => {
    alert(`Simulação: Exportando PDF de "${documentName}"...`);
  };

  // --- 4. Renderização ---
  if (!activeDocument) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center text-gray-500">
          <p>Nenhum documento carregado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* --- HEADER & TOOLBAR (Fixos) --- */}
      <div className="flex-shrink-0 bg-white shadow-sm z-20 relative">
        <EditorHeader
          documentName={documentName}
          onNameChange={(name) => {
            setDocumentName(name);
            setSaveStatus('unsaved');
          }}
          printContentRef={editorContentRef}
          saveStatus={saveStatus}
          onSave={handleSave}
          onExportPdf={handleExportPdf}
          onShowSettings={() => setShowVariablesPanel(true)}
          isSettingsOpen={showVariablesPanel}
          isSaveDisabled={saveStatus === 'saved' || saveStatus === 'saving'}
        />
        <EditorTabBar
          documents={documents}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
        />
        {editor && <EditorToolbar editor={editor} />}
      </div>

      {/* --- ÁREA DE EDIÇÃO (Mesa Cinza) --- */}
      <div
        className="flex-1 overflow-y-auto relative bg-gray-100"
        id="editor-scroll-container"
      >
        <div className="editor-layout min-h-full py-8 flex justify-center">
          <div className="relative z-10" ref={editorContentRef}>
            {editor ? (
              <div className="relative z-0">
                <EditorContent editor={editor} />
              </div>
            ) : (
              <div className="w-[210mm] h-[297mm] bg-white shadow flex items-center justify-center text-gray-400">
                Carregando documento...
              </div>
            )}
          </div>

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
            attachedClauses={documents.filter((d) => d.isAnnex)}
            onAttachTerm={onAttachTerm}
          />
        </div>
      </div>

      {/* Footer */}
      {editor && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200 z-20">
          <EditorFooter editor={editor} saveStatus={saveStatus} />
        </div>
      )}
    </div>
  );
};