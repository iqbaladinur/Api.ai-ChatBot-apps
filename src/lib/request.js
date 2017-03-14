import axios from 'axios';
import moment from 'moment';

const BASE_API_URL = 'http://localhost:5000/';

export const ask = question => {
	const payload = {question : question};
	return axios.post(`${BASE_API_URL}`,payload)
		.then(
			response => ({
			author	: 'Bot',
			text	: response.data,
			createdAt: moment().format(),
		}));
};