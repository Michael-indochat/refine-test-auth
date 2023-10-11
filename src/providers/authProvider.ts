// Ref: https://refine.dev/docs/tutorial/understanding-authprovider/index/#auth-provider-examples
import { AuthBindings } from "@refinedev/core";
import { apiLogin } from "./api/api";
export const TOKEN_KEY = "ms_api_token";

export const authProvider: AuthBindings = {
  login: async ({ account, account_id, password, system_id }) => {
    const apiResult = await apiLogin({ account, account_id, password, system_id });

    if (apiResult && apiResult.token) {
      localStorage.setItem(TOKEN_KEY, apiResult.token);
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
