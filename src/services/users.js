import Api from "./api";

const UsersService = { 
    register: async (params) => {
        try {
            const response = await Api.post("/users/register", params);
            return response;
        } catch (error) {
            console.error('Erro ao registrar usuário', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    login: async (params) => { 
        try {
                const response = await Api.post('/users/login', params);
                if(response.data && response.data.user && response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                return response.data.user
                } else {
                    throw new Error ('Invalid response data');
                }
        } catch (error) {
            console.error('Login failed', error.response ?  error.response.data : error.message);
            throw new Error('Login failed');
        }
    },
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}

export default UsersService