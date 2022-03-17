import { protectedApi } from '.';

export const createModule = async (modulo) => {
  try {
    const response = await protectedApi.post('/modulos', modulo);
    return response.data;

  } catch (error) {
    Promise.reject(error)
  };
}




