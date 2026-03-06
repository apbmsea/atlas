import { $api } from './instance';

export type FileInfo = {
  objectKey: string;
  size?: number;
  contentType?: string;
  createdAt?: string;
};

export const FilesAPI = {
  async upload(file: File): Promise<FileInfo> {
    const form = new FormData();
    form.append('file', file);
    const r = await $api.post<FileInfo>('/files/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return r.data;
  },

  async list(): Promise<FileInfo[]> {
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