export type ContractStatus = 'active' | 'draft' | 'expired' | 'archived';

export interface ContractListItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  status: ContractStatus;
}