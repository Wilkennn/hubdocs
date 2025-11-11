import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import { CreateContractModal } from '../features/contracts/components/CreateContractModal';
import { ContractCard } from '../features/contracts/components/ContractCard';
import { SearchInput } from '../components/ui/SearchInput';


// Ícones
import { Loader2, AlertCircle, Plus } from 'lucide-react';
import type { ContractListItem } from '../types/contract.types';
import { Button } from '../components/ui/Button';

// Tipos


// --- Dados Mockados para a Lista ---
const MOCK_CONTRACTS: ContractListItem[] = [
  { id: 1, name: 'Contrato de Prestação de Serviços - Empresa X', createdAt: '2025-10-29T10:00:00Z', updatedAt: '2025-11-01T15:30:00Z', userId: 1, status: 'active' },
  { id: 2, name: 'Acordo de Confidencialidade (NDA) - Startup Y', createdAt: '2025-10-25T09:00:00Z', updatedAt: '2025-10-25T09:00:00Z', userId: 1, status: 'draft' },
  { id: 3, name: 'Contrato de Aluguel - Imóvel Z', createdAt: '2024-01-10T00:00:00Z', updatedAt: '2025-01-10T12:00:00Z', userId: 1, status: 'expired' },
];
// ------------------------------------

export const ContractsListPage: React.FC = () => {
  // --- Estados da Página ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- Estados de Dados (Simulados) ---
  const [contracts, setContracts] = useState<ContractListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simula a busca de dados (componentDidMount)
  useEffect(() => {
    console.log('[MOCK DATA] Buscando contratos...');
    const timer = setTimeout(() => {
      setContracts(MOCK_CONTRACTS);
      setIsLoading(false);
      console.log('[MOCK DATA] Contratos carregados.');
    }, 1200); // Simula 1.2s de carregamento

    return () => clearTimeout(timer);
  }, []);

  // --- Lógica de Filtragem ---
  const filteredContracts = useMemo(() => {
    if (!searchTerm.trim()) return contracts;
    return contracts.filter(contract =>
      contract.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contracts, searchTerm]);

  // --- Renderização de Loading / Erro ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Carregando contratos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <p className="text-sm text-red-800"><b>Erro:</b> {error.message}</p>
      </div>
    );
  }

  // --- Renderização Principal ---
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Contratos
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Contrato
        </Button>
      </div>

      <SearchInput
        placeholder="Buscar contrato pelo nome..."
        className="w-full mb-6" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {filteredContracts.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContracts.map(contract => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-10">
          {searchTerm
            ? 'Nenhum contrato encontrado para sua busca.'
            : 'Nenhum contrato encontrado.'}
        </p>
      )}

      {/* O Modal (agora aponta para a versão mockada) */}
      <CreateContractModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};