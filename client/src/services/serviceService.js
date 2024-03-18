import axiosInstance from "./axiosInstance";

const serviceService = {
    createService: async (service) => {
      try {
          const response = await axiosInstance.post('/services/create', service)
          return response.data
      } catch (error) {
          throw error;
      }
    },
    getServices: async (user) => {
        try {
            const response = await axiosInstance.get('/services/' + user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserServices: async () => {
        try {
            const response = await axiosInstance.get('/services/providers')
            return response.data
        } catch (error) {
            throw error
        }
    },
}

export default serviceService
