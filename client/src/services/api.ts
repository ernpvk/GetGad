const BASE_URL = "http://localhost:3000/api";

export const api = {
  getAllProducts: async (limit: number) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      return null;
    }
  },

  getProductPage: async (page: number, limit: number) => {
    try {
      const response = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch product page");
      return await response.json();
    } catch (error) {
      console.error("Error in getProductPage:", error);
      return null;
    }
  },


  getAllCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/category`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error in getAllCategories:", error);
      return null;
    }
  }
};
