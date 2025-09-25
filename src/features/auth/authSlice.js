import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, thunkAPI) => {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 30
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');

            // Store accessToken
            localStorage.setItem('accessToken', data.accessToken);

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken');
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
