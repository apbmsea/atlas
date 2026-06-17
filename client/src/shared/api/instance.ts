import type { HandledError } from '@shared/types/handledError';
import axios from 'axios';
import type { FileInfo } from '@shared/types/file';
import { API_BASE_URL } from '@app/const/ws';

export const $api = axios.create({
	baseURL: API_BASE_URL.replace(/\/+$/, ''),
	// baseURL: import.meta.env.VITE_SERVER_URL,
	// withCredentials: true,
	timeout: 15000
});

$api.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if (!error.response) {
			switch (error.code) {
				case 'ERR_NETWORK':
					console.error('ERR_NETWORK');
					break;
				case 'ECONNABORTED':
					console.error('ECONNABORTED');
					break;
				case 'ERR_CANCELED':
					console.error('ERR_CANCELED');
					break;
			}

			return Promise.reject(error);
		}

		const handledError: HandledError = {
			status: error.response.status,
			data: error.response.data
		};

		switch (handledError.status) {
			case 400:
				return Promise.reject(handledError);

			case 401:
				if (!originalRequest._isRetry) {
					originalRequest._isRetry = true;
					console.log('refresh');
				}
				break;

			case 403:
				console.warn('Доступ запрещён');
				break;

			case 404:
				console.warn('Ресурс не найден');
				break;

			case 500:
				console.error('Ошибка сервера');
				break;

			default:
				console.error('Необработанная ошибка', handledError);
		}
		return Promise.reject(handledError);
	}
);



export const FilesAPI = {
	async upload(file: File): Promise<FileInfo> {
		const form = new FormData();
		form.append('file', file);
		const r = await $api.post<FileInfo>('/files/upload', form, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return r.data;
	},

	async list() {
		const r = await $api.get<FileInfo[]>('/files');
		return r.data;
	},

	async info(objectKey: string): Promise<FileInfo> {
		const key = encodeURIComponent(objectKey);
		const r = await $api.get<FileInfo>(`/files/${key}`);
		return r.data;
	},

	// glTF (JSON) с embedded base64. Увеличенный таймаут.
	async gltf(objectKey: string): Promise<string> {
		const key = encodeURIComponent(objectKey);
		const r = await $api.get<string>(`/files/${key}/gltf`, {
			responseType: 'text',
			timeout: 120_000,
		});
		return r.data;
	},

	async remove(objectKey: string): Promise<void> {
		const key = encodeURIComponent(objectKey);
		await $api.delete<void>(`/files/${key}`);
	},
};