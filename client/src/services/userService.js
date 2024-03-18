import axiosInstance from './axiosInstance';

const userService = {
    getUserRole: async () => {
        try {
            const response = await axiosInstance.get('/users/get-user-role');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserName: async () => {
        try {
            const response = await axiosInstance.get('/users/get-user-name');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    registerUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/register', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const response = await axiosInstance.get('/users/get-users');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
    getProviders: async () => {
        try {
            const response = await axiosInstance.get('/users/providers');
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default userService;
