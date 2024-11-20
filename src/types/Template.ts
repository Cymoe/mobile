export interface InvoiceTemplate {
  id: string;
  name: string;
  description?: string;
  items: TemplateItem[];
  defaultDueDate?: number; // Days from creation
}

export interface TemplateItem {
  description: string;
  quantity: number;
  price: number;
}