import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_PROVIDERS, USER_REDUCER} from "../../utils/constants";
import userService from "../../services/userService";

const initialState = {
    loading: false,
    noData: false,
    fetched: false,
    providers: [],
    error: ''
}

export const fetchProviders = createAsyncThunk(ALL_PROVIDERS, () => {
    return userService.getProviders();
})

const user = createSlice({
    name: USER_REDUCER,
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProviders.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProviders.fulfilled, (state, action) => {
            state.loading = false
            state.providers = action.payload.providers
            state.error = ''
            state.fetched = true
        })
        builder.addCase(fetchProviders.rejected, (state, action) => {
            state.loading = false
            state.providers = []
            state.error = action.error.message
        })
    }
})

export default user.reducer
