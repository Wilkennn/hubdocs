import { api } from '../../lib/api';
import type { Template } from '../../types/index';

class TemplateService {
  async getAll(): Promise<Template[]> {
    const response = await api.get<Template[]>('/templates');
    return response.data;
  }

  async getById(id: string): Promise<Template> {
    const response = await api.get<Template>(`/templates/${id}`);
    return response.data;
  }

  async getActiveTemplates(): Promise<Template[]> {
    const response = await api.get<Template[]>('/templates?active=true');
    return response.data;
  }
}

export const templateService = new TemplateService();
