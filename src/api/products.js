const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();

  // Supports either:
  // { products: [...] }
  // or [...]
  return Array.isArray(data) ? data : data.products;
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }

    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  const data = await response.json();

  return data.product ?? data;
};