import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CREATE_REQUEST, PROVIDER_REQUESTS, REQUEST_REDUCER, UPDATE_REQUEST} from "../../utils/constants";
import requestService from "../../services/requestService";

const initialState = {
    loading: false,
    noData: false,
    fetched: false,
    requests: [],
    error: ''
}

export const newRequest = createAsyncThunk(CREATE_REQUEST, (request) => {
    return requestService.createRequest(request)
})

export const getProviderRequests = createAsyncThunk(PROVIDER_REQUESTS, () => {
    return requestService.providersRequest()
})

export const updateRequest = createAsyncThunk(UPDATE_REQUEST, (data) => {
    return requestService.updateRequest(data)
})

const request = createSlice({
    name: REQUEST_REDUCER,
    initialState,
    extraReducers: builder => {
        builder.addCase(getProviderRequests.pending, state => {
            state.loading = true
        })
        builder.addCase(getProviderRequests.fulfilled, (state, action) => {
            state.loading = false
            state.requests = action.payload.requests
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getProviderRequests.rejected, (state, action) => {
            state.loading = false
            state.requests = []
            state.error = action.error.message
        })

        builder.addCase(newRequest.pending, state => {

        })
        builder.addCase(newRequest.fulfilled, (state, action) => {
            const tempRequests = [...state.requests]
            // console.log(action.payload)
            tempRequests.push(action.payload.request)
            state.requests = tempRequests
        })
        builder.addCase(newRequest.rejected, state => {

        })

        builder.addCase(updateRequest.pending, state => {

        })
        builder.addCase(updateRequest.fulfilled, (state, action) => {
            console.log(action.payload)
            let value = state.requests.find(v => v._id === action.payload.request._id)
            console.log(value)
            value.status = action.payload.request.status
        })
        builder.addCase(updateRequest.rejected, state => {

        })
    }
})

export default request.reducer
