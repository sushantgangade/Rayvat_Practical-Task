import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        return data.products;
    }
);

// Add product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product) => {
        const res = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        const data = await res.json();
        return data;
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const updated = await res.json();
        return { id, updated };
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
        return id;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: { list: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
            .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

            // Add product
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })

            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id, updated } = action.payload;
                const idx = state.list.findIndex(p => p.id === id);
                if (idx !== -1) state.list[idx] = updated;
            })

            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p.id !== action.payload);
            });
    }
});

// export { fetchProducts, addProduct, updateProduct, deleteProduct };
export default productSlice.reducer;
