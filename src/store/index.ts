import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 