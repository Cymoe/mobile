import localforage from 'localforage';
import { Invoice } from '../types/Invoice';

const INVOICES_KEY = 'invoices';

export const getInvoices = async (): Promise<Invoice[]> => {
  const invoices = await localforage.getItem<Invoice[]>(INVOICES_KEY);
  return invoices || [];
};

export const saveInvoice = async (invoice: Invoice): Promise<void> => {
  const invoices = await getInvoices();
  invoices.push(invoice);
  await localforage.setItem(INVOICES_KEY, invoices);
};

export const updateInvoice = async (updatedInvoice: Invoice): Promise<void> => {
  const invoices = await getInvoices();
  const index = invoices.findIndex(inv => inv.id === updatedInvoice.id);
  if (index !== -1) {
    invoices[index] = updatedInvoice;
    await localforage.setItem(INVOICES_KEY, invoices);
  }
};