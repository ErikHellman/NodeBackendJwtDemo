import axios from 'axios'
import jwtDecode from 'jwt-decode';

export default class Api {
    constructor() {
        this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
        axios.defaults.baseURL = this.baseURL;
        this.authToken = window.localStorage.getItem('authToken');
        this.user = undefined;

        if (this.authToken) {
            this.user = jwtDecode(this.authToken);
            console.log('decoded token', this.user);
        }

        axios.interceptors.request.use((config) => {
            if (this.authToken) {
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
        let status = 200;
        try {
            const response = await axios.post('/chat', { content, author: this.user.userName });
            status = response.status;
        } catch (e) {
            window.localStorage.removeItem('authToken');
            this.authToken = null;
            status = e.response.status;
        }
        return status;
    }

    async fetchMessages() {
        try {
            const response = await axios.get('/chat')
            return response.data;
        } catch (e) {
            window.localStorage.removeItem('authToken');
            this.authToken = null;
            return { error: e.response.statusText, status: e.response.status };
        }
    }

    validToken() { return jwtDecode(this.authToken); }
}