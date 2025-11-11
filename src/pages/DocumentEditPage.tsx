// src/pages/DocumentEditPage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { ContractEditor } from '../components/ContractEditor';
import { 
  type DocumentData, 
  type Clause, 
  type Version 
} from '../types/contract.types';
import { Loader2 } from 'lucide-react'; // Ícone de carregamento

// --- (INÍCIO) Dados Mockados (Simulados) ---

const MOCK_DOCUMENTS_LIST: DocumentData[] = [
  {
    id: 'doc_mock_123',
    name: 'Contrato Principal',
    htmlContent: '<h1>Contrato de Teste</h1><p>Este é o documento <strong>principal</strong>.</p>',
    versions: [
      { 
        versionId: 'v1_mock', 
        timestamp: new Date(Date.now() - 3600000).toISOString(), 
        htmlContent: '<h1>Versão 1</h1><p>Conteúdo antigo.</p>' 
      },
    ],
    isAnnex: false,
  },
  {
    id: 'doc_mock_456',
    name: 'Anexo A: Confidencialidade',
    htmlContent: '<h2>Anexo A</h2><p>Este é o conteúdo do termo de <strong>confidencialidade</strong>.</p>',
    versions: [],
    isAnnex: true,
  },
];

const MOCK_AVAILABLE_CLAUSES: Clause[] = [
  {
    id: 'clause_mock_TOS',
    title: 'Termos de Serviço (TOS)',
    content: '<h2>Anexo B</h2><p>Este é o conteúdo dos <strong>Termos de Serviço</strong>.</p>',
  },
  {
    id: 'clause_mock_AUP',
    title: 'Política de Uso',
    content: '<h2>Anexo C</h2><p>Política de uso...</p>',
  },
];

const MOCK_VARIABLES: { [key: string]: string } = {
  'nome_cliente': 'Empresa Fantasia S/A',
  'cnpj_cliente': '12.345.678/0001-99',
  'nome_contratada': 'HubDocs Ltda',
};

// --- (FIM) Dados Mockados ---

const LoadingSpinner: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
    <span className="ml-3 text-lg text-gray-600">Carregando editor...</span>
  </div>
);

export const ContractEditorPage: React.FC = () => {
  // --- Estados ---
  const [documents, setDocuments] = useState<DocumentData[]>([]); 
  const [variables, setVariables] = useState<{ [key: string]: string }>({});
  const [availableClauses, setAvailableClauses] = useState<Clause[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito de Carga (Simulado)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDocuments(MOCK_DOCUMENTS_LIST);
      setVariables(MOCK_VARIABLES);
      setAvailableClauses(MOCK_AVAILABLE_CLAUSES);
      setIsLoading(false);
      console.log('Dados mockados (Tabbed) carregados.');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Callback de Salvar (Simulado)
  const handleSaveDocument = useCallback(async (
    docId: string, 
    newName: string, 
    newHtmlContent: string
  ): Promise<boolean> => {
    
    console.log(`[MOCK SAVE] Salvando Documento ID: ${docId}`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === docId) {
          const newVersion: Version = {
            versionId: `v_mock_${Date.now()}`,
            timestamp: new Date().toISOString(),
            htmlContent: doc.htmlContent, // Salva o conteúdo *anterior*
          };
          
          return {
            ...doc,
            name: newName,
            htmlContent: newHtmlContent,
            versions: [newVersion, ...doc.versions], // Adiciona ao histórico
          };
        }
        return doc;
      })
    );
    
    console.log('[MOCK SAVE] Salvo com sucesso!');
    return true; 
  }, []);

  // Callback de Anexar (Simulado)
  const handleAttachTerm = useCallback(async (clause: Clause) => {
    console.log(`[MOCK ATTACH] Anexando termo: "${clause.title}"`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setAvailableClauses(prevClauses => 
      prevClauses.filter(c => c.id !== clause.id)
    );

    const newDocument: DocumentData = {
      id: clause.id,
      name: clause.title,
      htmlContent: clause.content,
      versions: [],
      isAnnex: true,
    };

    setDocuments(prevDocs => [...prevDocs, newDocument]);
    alert(`[MOCK] Termo "${clause.title}" anexado com sucesso!`);

  }, []);

  // --- Renderização ---
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // CORREÇÃO: Adiciona uma guarda para o caso de a lista de MOCK
  // vir vazia por algum motivo
  if (!documents || documents.length === 0) {
    return <div>Erro: Nenhum documento mockado foi carregado.</div>;
  }

  return (
    <ContractEditor
      // Dados
      documents={documents}
      variables={variables}
      availableClauses={availableClauses}
      
      // Ações
      onSave={handleSaveDocument}
      onAttachTerm={handleAttachTerm}
    />
  );
};