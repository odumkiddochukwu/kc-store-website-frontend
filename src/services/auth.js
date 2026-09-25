const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5500/api/v1";

const TOKEN_KEY = "ecommerce_auth_token";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const response = await request("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const token = response?.data?.token || null;
  const user = response?.data?.user || null;

  if (token) {
    setToken(token);
  }

  return {
    token,
    user,
    data: response,
  };
};

export const loginUser = async ({
  email,
  password,
}) => {
  const response = await request("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const token = response?.data?.token || null;
  const user = response?.data?.user || null;

  if (token) {
    setToken(token);
  }

  return {
    token,
    user,
    data: response,
  };
};

export const logoutUser = async () => {
  try {
    await request("/auth/sign-out", {
      method: "POST",
    });
  } finally {
    removeToken();
  }
};

export const hasAuthToken = () => {
  return Boolean(getToken());
};
