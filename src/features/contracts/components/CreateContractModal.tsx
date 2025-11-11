import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { ContractDetails } from '../../../types/contract.types';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

// Componentes de UI


type CreateContractModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateContractModal: React.FC<CreateContractModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [contractName, setContractName] = useState('');
  const [isPending, setIsPending] = useState(false); // Estado de loading local
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contractName.trim()) return;

    setIsPending(true);
    console.log('[MOCK CREATE] Criando contrato:', contractName);

    // Simula a criação na API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Cria um novo objeto de contrato mockado
    const newData: ContractDetails = {
      id: Math.floor(Math.random() * 1000) + 10, // ID aleatório
      name: contractName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 1,
      status: 'draft',
      documents: [], // O backend real criaria um doc principal
      template: null,
    };
    
    console.log('Contrato criado:', newData);
    onClose(); // Fecha o modal
    setContractName(''); 
    setIsPending(false);
    
    // Navega para a página de edição (simulada)
    // ATENÇÃO: A página de edição também precisa estar mockada
    navigate(`/contracts/${newData.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Contrato">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contractName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Contrato
          </label>
          <Input
            id="contractName"
            type="text"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            placeholder="Ex: Contrato de Prestação de Serviços"
            required
            disabled={isPending}
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending || !contractName.trim()}
            className="flex items-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? 'Criando...' : 'Criar Contrato'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};