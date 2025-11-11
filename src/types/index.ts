export type ContractStatus = 'draft' | 'in_review' | 'signed' | 'archived';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'legal' | 'sales';
}

export interface Contract {
  id: string;
  name: string;
  status: ContractStatus;
  templateId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractVersion {
  id: string;
  contractId: string;
  versionNumber: number;
  htmlContent: string;
  variablesData: Record<string, any>;
  appliedClauses: Clause[];
  createdBy: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  htmlTemplate: string;
  variablesSchema: Record<string, VariableSchema>;
  isActive: boolean;
}

export interface VariableSchema {
  type: 'string' | 'number' | 'date' | 'select';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: any;
}

export interface Clause {
  id: string;
  code: string;
  name: string;
  category: string;
  htmlContent: string;
  description: string;
  tags: string[];
}

export interface ConditionalRule {
  id: string;
  templateId: string;
  name: string;
  priority: number;
  condition: any; // JSON-logic format
  actions: {
    append_clauses?: string[];
    set_variables?: Record<string, any>;
  };
}

