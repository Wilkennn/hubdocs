// src/components/ui/Modal.tsx

import React from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Conteúdo do Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar no card
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Corpo */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};