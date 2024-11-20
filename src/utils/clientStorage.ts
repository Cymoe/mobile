import localforage from 'localforage';
import { Client } from '../types/Client';

const CLIENTS_KEY = 'clients';

export const getClients = async (): Promise<Client[]> => {
  const clients = await localforage.getItem<Client[]>(CLIENTS_KEY);
  return clients || [];
};

export const saveClient = async (client: Client): Promise<void> => {
  const clients = await getClients();
  clients.push(client);
  await localforage.setItem(CLIENTS_KEY, clients);
};

export const updateClient = async (updatedClient: Client): Promise<void> => {
  const clients = await getClients();
  const index = clients.findIndex(c => c.id === updatedClient.id);
  if (index !== -1) {
    clients[index] = updatedClient;
    await localforage.setItem(CLIENTS_KEY, clients);
  }
};

export const deleteClient = async (clientId: string): Promise<void> => {
  const clients = await getClients();
  const filteredClients = clients.filter(c => c.id !== clientId);
  await localforage.setItem(CLIENTS_KEY, filteredClients);
};