import apiHandler from "../../apiHandler";
import {
  setAuthCookies,
  clearAuthCookies,
  setFPEmailCookie,
  clearFPEmailCookie,
} from "../../cookies";

const BASE = "/v1/dhq-admin/auth";

const authAPI = {
  login: async (data, rememberMe = false) => {
    const response = await apiHandler.post(`${BASE}/login`, data);
    setAuthCookies(response.data, rememberMe);
    return response;
  },

  logout: async () => {
    const response = await apiHandler.post(`${BASE}/logout`);
    clearAuthCookies();
    return response;
  },

  me: () => apiHandler.get(`${BASE}/me`),

  forgotPassword: async (data) => {
    const response = await apiHandler.post(`${BASE}/forgot-password`, data);
    setFPEmailCookie(response.data.email);
    return response;
  },

  resetPassword: async (data) => {
    const response = await apiHandler.post(`${BASE}/reset-password`, data);
    clearFPEmailCookie();
    return response;
  },
};

export default authAPI;
