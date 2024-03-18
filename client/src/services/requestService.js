import axiosInstance from "./axiosInstance";

const requestService = {
    createRequest: async (request) => {
        try {
            const response = await axiosInstance.post('/request/create', request)
            return response.data
        } catch (error) {
            throw error;
        }
    },
    providersRequest: async () => {
        try {
            const response = await axiosInstance.get('/request/providers')
            return response.data
        } catch (error) {
            throw error;
        }
    },
    updateRequest: async (data) => {
        try {
            const response = await axiosInstance.put('/request/' + data.request, data)
            return response.data
        } catch (error) {
            throw error;
        }
    }
}

export default requestService
