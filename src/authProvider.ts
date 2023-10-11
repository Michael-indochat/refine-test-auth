import { AuthBindings } from "@refinedev/core";
import axios from "axios";

export const TOKEN_KEY = "refine-auth";

axios.defaults.baseURL = 'https://admin-api-staging.indochat.net';
// 假設的 apiLogin 函數
async function apiLogin(account = 'michael', account_id = null, password, system_id = 1) {
  try {
    const response = await axios.post('/v1/admin-token', { account, account_id, password, system_id });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
}

export const authProvider: AuthBindings = {
  login: async ({ account, account_id, password, system_id }) => {

    const apiResult = await apiLogin(account, account_id, password, system_id);

    if (apiResult) {
      localStorage.setItem(TOKEN_KEY, account);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
