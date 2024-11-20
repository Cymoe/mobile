import { Product } from '../types/Product';
import { InvoiceTemplate } from '../types/Template';
import { Client } from '../types/Client';
import { Invoice } from '../types/Invoice';
import { saveProduct } from './productStorage';
import { saveTemplate } from './templateStorage';
import { saveClient } from './clientStorage';
import { saveInvoice } from './storage';
import { generateUUID } from './uuid';

// Previous sample data remains the same...
export const sampleProducts: Product[] = [
  {
    id: generateUUID(),
    name: 'Web Development',
    description: 'Professional web development services',
    price: 150,
    unit: 'hour',
    category: 'Development'
  },
  {
    id: generateUUID(),
    name: 'UI/UX Design',
    description: 'User interface and experience design',
    price: 1500,
    unit: 'project',
    category: 'Design'
  },
  {
    id: generateUUID(),
    name: 'Mobile App Development',
    description: 'Native mobile application development',
    price: 175,
    unit: 'hour',
    category: 'Development'
  },
  {
    id: generateUUID(),
    name: 'SEO Optimization',
    description: 'Search engine optimization services',
    price: 800,
    unit: 'month',
    category: 'Marketing'
  },
  {
    id: generateUUID(),
    name: 'Content Writing',
    description: 'Professional content writing and copywriting',
    price: 100,
    unit: 'page',
    category: 'Content'
  }
];

export const sampleClients: Client[] = [
  {
    id: generateUUID(),
    name: 'John Smith',
    email: 'john.smith@techsolutions.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    address: '123 Innovation Drive, Silicon Valley, CA 94025'
  },
  {
    id: generateUUID(),
    name: 'Sarah Johnson',
    email: 'sarah@digitalmarketing.co',
    phone: '+1 (555) 234-5678',
    company: 'Digital Marketing Pro',
    address: '456 Market Street, San Francisco, CA 94105'
  },
  {
    id: generateUUID(),
    name: 'Michael Chen',
    email: 'mchen@innovatesoft.com',
    phone: '+1 (555) 345-6789',
    company: 'Innovate Software Solutions',
    address: '789 Tech Park, Austin, TX 78701'
  },
  {
    id: generateUUID(),
    name: 'Emily Brown',
    email: 'emily@creativedesigns.com',
    phone: '+1 (555) 456-7890',
    company: 'Creative Designs Studio',
    address: '321 Art Avenue, New York, NY 10012'
  },
  {
    id: generateUUID(),
    name: 'David Wilson',
    email: 'david@ecommerce.net',
    phone: '+1 (555) 567-8901',
    company: 'E-Commerce Experts',
    address: '567 Commerce Blvd, Seattle, WA 98101'
  },
  {
    id: generateUUID(),
    name: 'Lisa Anderson',
    email: 'lisa@healthtech.org',
    phone: '+1 (555) 678-9012',
    company: 'HealthTech Solutions',
    address: '890 Medical Center Dr, Boston, MA 02115'
  },
  {
    id: generateUUID(),
    name: 'Robert Martinez',
    email: 'robert@fintech.io',
    phone: '+1 (555) 789-0123',
    company: 'FinTech Innovations',
    address: '234 Wall Street, New York, NY 10005'
  },
  {
    id: generateUUID(),
    name: 'Jennifer Lee',
    email: 'jennifer@edutech.edu',
    phone: '+1 (555) 890-1234',
    company: 'EduTech Learning',
    address: '432 Campus Drive, Palo Alto, CA 94304'
  }
];

export const sampleTemplates: InvoiceTemplate[] = [
  {
    id: generateUUID(),
    name: 'Basic Web Development Package',
    description: 'Standard web development services package',
    items: [
      {
        description: 'Web Development',
        quantity: 40,
        price: 150
      },
      {
        description: 'UI/UX Design',
        quantity: 1,
        price: 1500
      }
    ],
    defaultDueDate: 30
  },
  {
    id: generateUUID(),
    name: 'Mobile App Starter',
    description: 'Initial mobile app development package',
    items: [
      {
        description: 'Mobile App Development',
        quantity: 60,
        price: 175
      },
      {
        description: 'UI/UX Design',
        quantity: 1,
        price: 1500
      }
    ],
    defaultDueDate: 45
  },
  {
    id: generateUUID(),
    name: 'Digital Marketing Bundle',
    description: 'Complete digital marketing package',
    items: [
      {
        description: 'SEO Optimization',
        quantity: 3,
        price: 800
      },
      {
        description: 'Content Writing',
        quantity: 10,
        price: 100
      }
    ],
    defaultDueDate: 15
  }
];

// New sample invoices
export const sampleInvoices: Invoice[] = [
  {
    id: generateUUID(),
    customerName: 'Tech Solutions Inc.',
    date: new Date('2024-01-15').toISOString(),
    dueDate: '2024-02-15',
    items: [
      {
        description: 'Web Development',
        quantity: 40,
        price: 150,
        total: 6000
      },
      {
        description: 'UI/UX Design',
        quantity: 1,
        price: 1500,
        total: 1500
      }
    ],
    total: 7500,
    status: 'paid'
  },
  {
    id: generateUUID(),
    customerName: 'Digital Marketing Pro',
    date: new Date('2024-01-20').toISOString(),
    dueDate: '2024-02-20',
    items: [
      {
        description: 'SEO Optimization',
        quantity: 3,
        price: 800,
        total: 2400
      },
      {
        description: 'Content Writing',
        quantity: 10,
        price: 100,
        total: 1000
      }
    ],
    total: 3400,
    status: 'pending'
  },
  {
    id: generateUUID(),
    customerName: 'Innovate Software Solutions',
    date: new Date('2024-01-25').toISOString(),
    dueDate: '2024-03-10',
    items: [
      {
        description: 'Mobile App Development',
        quantity: 60,
        price: 175,
        total: 10500
      },
      {
        description: 'UI/UX Design',
        quantity: 1,
        price: 1500,
        total: 1500
      }
    ],
    total: 12000,
    status: 'pending'
  },
  {
    id: generateUUID(),
    customerName: 'Creative Designs Studio',
    date: new Date('2024-01-10').toISOString(),
    dueDate: '2024-02-10',
    items: [
      {
        description: 'UI/UX Design',
        quantity: 2,
        price: 1500,
        total: 3000
      }
    ],
    total: 3000,
    status: 'paid'
  },
  {
    id: generateUUID(),
    customerName: 'E-Commerce Experts',
    date: new Date('2024-01-05').toISOString(),
    dueDate: '2024-02-05',
    items: [
      {
        description: 'Web Development',
        quantity: 30,
        price: 150,
        total: 4500
      },
      {
        description: 'SEO Optimization',
        quantity: 2,
        price: 800,
        total: 1600
      }
    ],
    total: 6100,
    status: 'paid'
  }
];

export const initializeSampleData = async () => {
  // Save products
  for (const product of sampleProducts) {
    await saveProduct(product);
  }
  
  // Save templates
  for (const template of sampleTemplates) {
    await saveTemplate(template);
  }

  // Save clients
  for (const client of sampleClients) {
    await saveClient(client);
  }

  // Save invoices
  for (const invoice of sampleInvoices) {
    await saveInvoice(invoice);
  }
};