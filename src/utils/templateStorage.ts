import localforage from 'localforage';
import { InvoiceTemplate } from '../types/Template';

const TEMPLATES_KEY = 'invoice_templates';

export const getTemplates = async (): Promise<InvoiceTemplate[]> => {
  const templates = await localforage.getItem<InvoiceTemplate[]>(TEMPLATES_KEY);
  return templates || [];
};

export const saveTemplate = async (template: InvoiceTemplate): Promise<void> => {
  const templates = await getTemplates();
  templates.push(template);
  await localforage.setItem(TEMPLATES_KEY, templates);
};

export const updateTemplate = async (updatedTemplate: InvoiceTemplate): Promise<void> => {
  const templates = await getTemplates();
  const index = templates.findIndex(t => t.id === updatedTemplate.id);
  if (index !== -1) {
    templates[index] = updatedTemplate;
    await localforage.setItem(TEMPLATES_KEY, templates);
  }
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
  const templates = await getTemplates();
  const filteredTemplates = templates.filter(t => t.id !== templateId);
  await localforage.setItem(TEMPLATES_KEY, filteredTemplates);
};