import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localhost:7132',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
    (error) => {
        return Promise.reject(error)
    }
)
// Chama todos os metodos
export default {
    /*
        --------------AUTH----------------    
    */
    login(credenciais) { // LOGIN
        return apiClient.post('/api/Auth/login', credenciais)
    },
    changePassword(credenciais) { // TRACAR SENHA
        return apiClient.post('/api/Auth/ChangePassword', credenciais)
    },
    /*
        --------------USERS----------------    
    */
    getUsers() {
        return apiClient.get('/api/Users')
    },
    register(userData) { // CADASTRO
        return apiClient.post('/api/Users/register', userData)
    },
    deleteUsers(userId){
        return apiClient.delete(`/api/Users/${id}`, userId)
    },
    updateUsers(userId){
        return apiClient.put(`/api/Users/${id}`, userId)
    },
    
    /*
        --------------POSTS----------------    
    */
    getPosts() {
        return apiClient.get('/api/Posts')
    },
    postPost(postData) {
        return apiClient.post('/api/Posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updatePost(postId) {
        return apiClient.put(`/api/Posts/${id}`, postId, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    deletePost(postId) {
        return apiClient.delete(`/api/Posts/${postId}`)
    },
    /*
        --------------LIKE----------------    
    */
    postLike(postId) {
        return apiClient.post(`/api/Like/${postId}`)
    },
    /*
            --------------TYPE CONTENT----------------    
        */
    getTypeContent() {
        return apiClient.get(`/api/TypeContent`)
    },

}