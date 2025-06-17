import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    products: [],
    loading: false,
    error: null,
};
const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateStock: (state, action) => {
            const product = state.products.find(p => p.id === action.payload.id);
            if (product) {
                product.stock += action.payload.quantity;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});
export const { setProducts, addProduct, updateProduct, deleteProduct, updateStock, setLoading, setError, } = inventorySlice.actions;
export default inventorySlice.reducer;
