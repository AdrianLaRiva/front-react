const API_BASE_URL = "http://apiadrian.wedev.cl/api/v1";
export {API_BASE_URL};

export const loginApi = () => `${API_BASE_URL}/users/login`;
export const logoutApi = () => `${API_BASE_URL}/users/logout`;

