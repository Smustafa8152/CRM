import { Customer, Invoice, InventoryItem, InvoiceItem } from '../types';

class AutomationService {
  // Check for overdue payments and send reminders
  checkOverduePayments(invoices: Invoice[], customers: Customer[]) {
    const today = new Date();
    const overdueInvoices = invoices.filter(invoice => {
      if (!invoice.creditSale || invoice.status === 'paid') return false;
      const dueDate = new Date(invoice.dueDate || '');
      return dueDate < today && invoice.outstandingAmount && invoice.outstandingAmount > 0;
    });

    overdueInvoices.forEach(invoice => {
      const customer = customers.find(c => c.id === invoice.customerId);
      if (customer) {
        this.sendPaymentReminder(customer, invoice);
      }
    });
  }

  // Check for low stock items
  checkLowStock(inventory: InventoryItem[]) {
    const lowStockItems = inventory.filter(item => 
      item.quantity <= 10 && item.stockStatus !== 'Out of Stock'
    );

    lowStockItems.forEach(item => {
      this.sendLowStockAlert(item);
    });
  }

  // Check for warranty expiry
  checkWarrantyExpiry(invoices: Invoice[]) {
    const today = new Date();
    invoices.forEach(invoice => {
      invoice.items.forEach(item => {
        const warrantyMonths = parseInt(item.warranty);
        if (warrantyMonths) {
          const invoiceDate = new Date(invoice.date);
          const expiryDate = new Date(invoiceDate.setMonth(invoiceDate.getMonth() + warrantyMonths));
          
          // Notify 30 days before expiry
          const notificationDate = new Date(expiryDate);
          notificationDate.setDate(notificationDate.getDate() - 30);

          if (today >= notificationDate && today <= expiryDate) {
            this.sendWarrantyExpiryNotification(invoice, item);
          }
        }
      });
    });
  }

  // Send payment reminder via WhatsApp
  private sendPaymentReminder(customer: Customer, invoice: Invoice) {
    const message = `Dear ${customer.name},\n\n` +
      `This is a reminder that payment of ₹${invoice.outstandingAmount?.toLocaleString()} ` +
      `for invoice ${invoice.id} is overdue.\n\n` +
      `Due date: ${new Date(invoice.dueDate || '').toLocaleDateString()}\n` +
      `Please process the payment at your earliest convenience.\n\n` +
      `Thank you,\nMobile Spare Parts`;

    // TODO: Integrate with WhatsApp API
    console.log('Sending payment reminder:', message);
  }

  // Send low stock alert
  private sendLowStockAlert(item: InventoryItem) {
    const message = `Low Stock Alert!\n\n` +
      `Item: ${item.name}\n` +
      `Current Stock: ${item.quantity}\n` +
      `Model: ${item.model}\n` +
      `Please reorder soon to maintain inventory levels.`;

    // TODO: Send to admin/manager
    console.log('Sending low stock alert:', message);
  }

  // Send warranty expiry notification
  private sendWarrantyExpiryNotification(invoice: Invoice, item: InvoiceItem) {
    const message = `Warranty Expiry Notice\n\n` +
      `Dear ${invoice.customerName},\n\n` +
      `The warranty for ${item.name} from invoice ${invoice.id} ` +
      `will expire in 30 days.\n\n` +
      `Please contact us if you need any assistance.\n\n` +
      `Thank you,\nMobile Spare Parts`;

    // TODO: Integrate with WhatsApp API
    console.log('Sending warranty expiry notification:', message);
  }

  // Calculate credit score for a customer
  calculateCreditScore(customer: Customer, invoices: Invoice[]): number {
    const customerInvoices = invoices.filter(inv => inv.customerId === customer.id);
    let score = 100; // Start with perfect score

    // Deduct points for overdue payments
    const overdueInvoices = customerInvoices.filter(inv => inv.status === 'overdue');
    score -= overdueInvoices.length * 10;

    // Deduct points for high outstanding amount
    const outstandingPercentage = (customer.outstandingAmount / customer.creditLimit) * 100;
    if (outstandingPercentage > 80) score -= 20;
    else if (outstandingPercentage > 50) score -= 10;

    // Add points for early payments
    const earlyPayments = customerInvoices.filter(inv => 
      inv.paymentHistory?.some(payment => {
        const paymentDate = new Date(payment.date);
        const dueDate = new Date(inv.dueDate || '');
        return paymentDate < dueDate;
      })
    );
    score += earlyPayments.length * 5;

    // Ensure score stays within 0-100
    return Math.max(0, Math.min(100, score));
  }

  // Suggest credit limit based on customer history
  suggestCreditLimit(customer: Customer, invoices: Invoice[]): number {
    const creditScore = this.calculateCreditScore(customer, invoices);
    const currentLimit = customer.creditLimit;
    
    // Get average monthly purchase
    const customerInvoices = invoices.filter(inv => inv.customerId === customer.id);
    const monthlyAverages = this.calculateMonthlyAverages(customerInvoices);
    
    // Base new limit on credit score and purchase history
    let suggestedLimit = currentLimit;
    
    if (creditScore >= 80) {
      suggestedLimit = Math.max(currentLimit, monthlyAverages * 3);
    } else if (creditScore >= 60) {
      suggestedLimit = Math.max(currentLimit, monthlyAverages * 2);
    } else if (creditScore < 40) {
      suggestedLimit = Math.min(currentLimit, monthlyAverages);
    }
    
    return Math.round(suggestedLimit);
  }

  // Calculate average monthly purchase amount
  private calculateMonthlyAverages(invoices: Invoice[]): number {
    if (invoices.length === 0) return 0;

    const monthlyTotals = new Map<string, number>();
    
    invoices.forEach(invoice => {
      const monthYear = invoice.date.substring(0, 7); // YYYY-MM
      const currentTotal = monthlyTotals.get(monthYear) || 0;
      monthlyTotals.set(monthYear, currentTotal + invoice.amount);
    });

    const total = Array.from(monthlyTotals.values()).reduce((sum, amount) => sum + amount, 0);
    return total / monthlyTotals.size;
  }
}

export const automationService = new AutomationService(); 