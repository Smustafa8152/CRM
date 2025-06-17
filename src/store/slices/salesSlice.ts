import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  items: SaleItem[];
  total: number;
  status: 'pending' | 'paid' | 'overdue';
}

interface SalesState {
  sales: Sale[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  sales: [],
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<Sale[]>) => {
      state.sales = action.payload;
    },
    addSale: (state, action: PayloadAction<Sale>) => {
      state.sales.push(action.payload);
    },
    updateSale: (state, action: PayloadAction<Sale>) => {
      const index = state.sales.findIndex(sale => sale.id === action.payload.id);
      if (index !== -1) {
        state.sales[index] = action.payload;
      }
    },
    updateSaleStatus: (state, action: PayloadAction<{ id: string; status: Sale['status'] }>) => {
      const sale = state.sales.find(s => s.id === action.payload.id);
      if (sale) {
        sale.status = action.payload.status;
      }
    },
    deleteSale: (state, action: PayloadAction<string>) => {
      state.sales = state.sales.filter(sale => sale.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSales,
  addSale,
  updateSale,
  updateSaleStatus,
  deleteSale,
  setLoading,
  setError,
} = salesSlice.actions;

export default salesSlice.reducer; 