import axios from 'axios';

const Axios = axios.create({
	baseURL: 'http://localhost:8000', // Base Backend server url
});

export { Axios };
