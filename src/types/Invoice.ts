export interface Invoice {
  id: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  total: number;
  status: 'pending' | 'paid';
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}