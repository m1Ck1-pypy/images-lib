import { Endpoints } from '../endpoints';
import { instance } from '../instance';

export const getAll = async () => {
  return (await instance.get(Endpoints.POSTS.ALL)).data;
};

export const create = async (data: FormData) => {
  return (await instance.post(Endpoints.POSTS.CREATE, data, { headers: { 'Content-Type': 'multipart/form-data' } }))
    .data;
};
