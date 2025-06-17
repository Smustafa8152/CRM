export interface Customer {
  id: string;
  name: string;
  contact: string;
  address: string;
  creditLimit: number;
  outstandingAmount: number;
  creditRating: 'A' | 'B' | 'C';
  lastPaymentDate: string;
  preferredCommunication: 'WhatsApp' | 'Email' | 'SMS';
  businessRegistration: string;
  warrantyClaims: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  model: string;
  quantity: number;
  price: number;
  supplier: string;
  lastRestockDate: string;
  warranty: string;
  technicalSpecs: string;
  compatibility: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  warranty: string;
}

export interface Invoice {
  id: string;
  date: string;
  customerName: string;
  customerId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paymentMethod: 'credit' | 'cash' | 'card' | 'upi';
  items: InvoiceItem[];
  paymentHistory?: {
    date: string;
    amount: number;
    method: string;
  }[];
  notes?: string;
  outstandingAmount?: number;
  creditSale?: boolean;
  saleId?: string;
  creditPaymentId?: string;
  dueDate?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
}

export interface Sale {
  id: string;
  date: string;
  customerName: string;
  items: InvoiceItem[];
  totalAmount: number;
  paymentStatus: 'Pending' | 'Partial' | 'Completed';
  paymentMethod: string;
  creditSale: boolean;
  creditLimit: number;
  outstandingAmount: number;
  notes: string;
}

export interface CreditPayment {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'active' | 'overdue' | 'suspended';
  paymentMethod: string;
  dueDate: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
  paymentHistory: {
    date: string;
    amount: number;
    method: string;
  }[];
} 