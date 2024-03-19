import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_REQUESTS, CREATE_REQUEST, PROVIDER_REQUESTS, REQUEST_REDUCER, UPDATE_REQUEST} from "../../utils/constants";
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

export const getAllRequests = createAsyncThunk(ALL_REQUESTS, () => {
    return requestService.allRequests()
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
    reducers: {
        resetRequest: (state) => {
            state.loading = false
            state.noData = false
            state.fetched = false
            state.requests = []
            state.error = ''
        }
    },
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

        builder.addCase(getAllRequests.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllRequests.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
            state.requests = action.payload.requests
            state.error = ''
            state.fetched = true
        })
        builder.addCase(getAllRequests.rejected, (state, action) => {
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
export const { resetRequest } = request.actions
