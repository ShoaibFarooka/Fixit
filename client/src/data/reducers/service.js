import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ALL_SERVICES, CREATE_SERVICE, SERVICE_REDUCER, USER_SERVICES} from "../../utils/constants";
import serviceService from "../../services/serviceService";

const initialState = {
    loading: false,
    noData: false,
    fetched: false,
    services: [],
    error: ''
}

export const fetchServices = createAsyncThunk(ALL_SERVICES, () => {
    return serviceService.getServices();
})

export const fetchUserServices = createAsyncThunk(USER_SERVICES, () => {
    return serviceService.getUserServices()
})

export const addService = createAsyncThunk(CREATE_SERVICE, (service) => {
    return serviceService.createService(service)
})

const service = createSlice({
    name: SERVICE_REDUCER,
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchServices.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchServices.fulfilled, (state, action) => {
            state.loading = false
            state.services = action.payload.services
            state.error = ''
            state.fetched = true
        })
        builder.addCase(fetchServices.rejected, (state, action) => {
            state.loading = false
            state.services = []
            state.error = action.error.message
        })

        builder.addCase(fetchUserServices.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUserServices.fulfilled, (state, action) => {
            state.loading = false
            state.services = action.payload.services
            state.error = ''
            state.fetched = true
        })
        builder.addCase(fetchUserServices.rejected, (state, action) => {
            state.loading = false
            state.services = []
            state.error = action.error.message
        })

        builder.addCase(addService.pending, state => {

        })
        builder.addCase(addService.fulfilled, (state, action) => {
            const tempServices = [...state.services]
            // console.log(action.payload)
            tempServices.push(action.payload.service)
            state.services = tempServices
        })
        builder.addCase(addService.rejected, state => {

        })
    }
})

export default service.reducer
