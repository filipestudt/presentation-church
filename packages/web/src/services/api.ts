import axios from 'axios';
import { ISongDTO } from '../../../shared/DTOs/ISongDTO';

const instance = axios.create({
	baseURL: 'http://192.168.0.102:3003'
})

instance.interceptors.response.use(async function (response) {
	return (await response).data;
}, function (error) {
	return Promise.reject(error);
});

export const Songs = {
	get: (): Promise<Array<ISongDTO>> =>
		instance.get('/songs'),
	getById: (id: string): Promise<Array<ISongDTO>> =>
		instance.get('/songs/' + id),
	getByFolder: (folder: string): Promise<Array<ISongDTO>> =>
		instance.get('/songs/folder/' + folder),
	post: (data: {}) =>
		instance.post('/songs', data),
	put: (id: string, data: {}) =>
		instance.put('/songs/' + id, data),
	delete: (id: string) =>
		instance.delete('/songs/' + id)
}