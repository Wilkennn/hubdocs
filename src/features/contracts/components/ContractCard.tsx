// src/features/contracts/components/ContractCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';

import { FileText, Clock, Calendar, CheckCircle, Edit3 } from 'lucide-react';
import type { ContractListItem } from '../../../types/contract.types';

type ContractCardProps = {
  contract: ContractListItem;
};

const renderStatusBadge = (status: 'active' | 'draft' | 'expired') => {
  switch (status) {
    case 'active':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <CheckCircle className="w-3.5 h-3.5" />
          Ativo
        </div>
      );
    case 'draft':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <Edit3 className="w-3.5 h-3.5" />
          Rascunho
        </div>
      );
    case 'expired':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          Expirado
        </div>
      );
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  return (
    <li className="h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-200">
      <Link 
        to={`/contracts/${contract.id}`} 
        className="flex flex-col justify-between h-full p-5 group"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
              {contract.name}
            </h3>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="mb-3">
            {renderStatusBadge(contract.status)}
          </div>
          <div className="space-y-1.5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>
                Atualizado: {formatDate(contract.updatedAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>
                Criado: {formatDate(contract.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};