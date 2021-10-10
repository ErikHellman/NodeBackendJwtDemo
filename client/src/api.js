import axios from 'axios'
import jwtDecode from "jwt-decode";

export default class Api {
    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
        axios.defaults.baseURL = this.baseURL;
        this.authToken = window.localStorage.getItem('authToken');

        if (this.authToken) {
            this.user = jwtDecode(this.authToken);
        }

        axios.interceptors.request.use((config) => {
            if (this.authToken) {
                console.log('Run auth interceptor:', this.authToken);
                config.headers = { 'X-Auth-Token': this.authToken }
            }
            return config;
        });
    }

    async login(userName, password) {
        try {
            const response = await axios.post('/login', { userName, password });
            if (response.status === 200) {
                this.authToken = response.data;
                this.user = jwtDecode(this.authToken);
                window.localStorage.setItem('authToken', this.authToken);
                return true;
            } else {
                return false;
            }    
        } catch (error) {
            console.error('Error logging in,', error);
            return false;
        }
    }

    async sendMessage(content) {
        const response = await axios.post('/chat', { content, author: this.user.userName });
        return response.status;
    }

    async fetchMessages() {
        const response = await axios.get('/chat');
        if (response.status === 200) {
            return response.data;
        } else {
            return { 'error': response.status };
        }
    }
}