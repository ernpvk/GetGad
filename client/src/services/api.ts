const BASE_URL = 'http://localhost:3000/api';

export const api = {
  getAllProducts: async (limit = 50) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    return response.json();
  }
};