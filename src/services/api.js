import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5134/api',
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
        return apiClient.post('auth/login', credenciais)
    },
    trocarSenha(credenciais) { // TRACAR SENHA
        return apiClient.post('/Auth/ChangePassword', credenciais)
    },
    /*
        --------------USERS----------------    
    */
    getUsers() {
        return apiClient.get('Users')
    },
    registro(userData) { // CADASTRO
        return apiClient.post('auth/Users/register', userData)
    },
    
    /*
        --------------POSTS----------------    
    */
    getPosts() {
        return apiClient.get('/Posts')
    },
    criarPost(postData) {
        return apiClient.post('/Posts', postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    /*
        --------------LIKE----------------    
    */
    darLike(postId) {
        return apiClient.post(`/Post/${postId}`)
    }
    /*
            --------------TYPE CONTENT----------------    
        */


}