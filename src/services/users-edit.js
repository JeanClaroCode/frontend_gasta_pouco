import Api from "./api";

const UsersEditService = {
    uploadProfilePic: async (image, id) => {
        const formData = new FormData();
        formData.append('image', image);
        const response = await Api.post(`/users/img/${id}`, formData, {
            headers: {
                'x-access-token': localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Retornando os dados da resposta
    },    

    userEdit: async (id, params) => {
        const response = await Api.put(`users/${id}`, params, {
            headers: {'x-access-token': localStorage.getItem("token")},
        });
        return response.data; // Retornando os dados da resposta
    }
}

export default UsersEditService;
