// src/components/ContractEditor/ToolbarButton.tsx
import React from 'react';

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  active = false, 
  disabled = false, 
  children, 
  title 
}) => (
  <button 
    onClick={onClick} 
    disabled={disabled} 
    title={title} 
    type="button" 
    className={`p-2 rounded hover:bg-gray-100 transition-colors ${ 
      active ? 'bg-primary/10 text-primary' : 'text-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
);