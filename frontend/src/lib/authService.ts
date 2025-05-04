// Authentication service for handling JWT operations

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface RefreshResponse {
  success: boolean;
  accessToken: string;
}

const API_URL = "http://localhost:5000/api/auth";

// Register a new user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // Store tokens in localStorage
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Login a user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Store tokens in localStorage
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Refresh the access token
export const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    // If refresh fails, log out the user
    logoutUser();
    throw new Error(data.message || "Token refresh failed");
  }

  // Store the new access token
  localStorage.setItem("accessToken", data.accessToken);

  return data.accessToken;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("accessToken") !== null;
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user !== null && user.role === "admin";
};

// Get auth token
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// Add authorization header to requests with token refresh capability
export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = new Headers(options.headers);

  // Add token to headers
  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", token);
  }

  // Create the request with auth header
  const requestOptions = {
    ...options,
    headers,
  };

  // Make the initial request
  let response = await fetch(url, requestOptions);

  // If unauthorized, try to refresh the token
  if (response.status === 401) {
    try {
      // Get a new access token
      const newToken = await refreshToken();

      // Update headers with new token
      headers.set("Authorization", newToken);

      // Try the request again with the new token
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (error) {
      // If refresh fails, the user will need to login again
      logoutUser();
      throw new error("Session expired. Please login again.");
    }
  }

  return response;
};

// Process OAuth redirect with token
export const processOAuthRedirect = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    // Store access token
    localStorage.setItem("accessToken", token);

    // Redirect to home or dashboard
    window.location.href = "/";
  }
};

// Update user information
export const updateUserInfo = async (updates: {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<User> => {
  const response = await authFetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Update failed");
  }

  // Update user in localStorage
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};
