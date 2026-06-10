import { computed, reactive } from "vue";
import axios from "axios";
import { d as useRuntimeConfig } from "../server.mjs";
function lsSet(key, val) {
  return;
}
const state = reactive({
  user: null,
  token: null,
  loading: false,
  error: null
});
const useAuth = () => {
  const config = useRuntimeConfig();
  const BASE = config.public.apiUrl?.replace("/anime", "") || "/api";
  const isLoggedIn = computed(() => !!state.token && !!state.user);
  const user = computed(() => state.user);
  const loading = computed(() => state.loading);
  const error = computed(() => state.error);
  function setSession(user2, token) {
    state.user = user2;
    state.token = token;
    lsSet("auth_user", JSON.stringify(user2));
  }
  function clearSession() {
    state.user = null;
    state.token = null;
  }
  function authHeaders() {
    return state.token ? { Authorization: `Bearer ${state.token}` } : {};
  }
  async function register(name, email, password, passwordConfirmation) {
    state.loading = true;
    state.error = null;
    try {
      const { data } = await axios.post(`${BASE}/auth/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      setSession(data.user, data.token);
      return { success: true };
    } catch (err) {
      state.error = extractError(err);
      return { success: false, error: state.error };
    } finally {
      state.loading = false;
    }
  }
  async function login(email, password) {
    state.loading = true;
    state.error = null;
    try {
      const { data } = await axios.post(`${BASE}/auth/login`, { email, password });
      setSession(data.user, data.token);
      return { success: true };
    } catch (err) {
      state.error = extractError(err);
      return { success: false, error: state.error };
    } finally {
      state.loading = false;
    }
  }
  async function logout() {
    try {
      await axios.post(`${BASE}/auth/logout`, {}, { headers: authHeaders() });
    } catch (_) {
    }
    clearSession();
  }
  async function fetchMe() {
    if (!state.token) return;
    try {
      const { data } = await axios.get(`${BASE}/auth/me`, { headers: authHeaders() });
      state.user = data.user;
      lsSet("auth_user", JSON.stringify(data.user));
    } catch (_) {
      clearSession();
    }
  }
  function loginWithGoogle() {
  }
  function handleGoogleCallback(token) {
    state.token = token;
    return fetchMe();
  }
  return {
    user,
    isLoggedIn,
    loading,
    error,
    register,
    login,
    logout,
    fetchMe,
    loginWithGoogle,
    handleGoogleCallback,
    authHeaders
  };
};
function extractError(err) {
  if (err.response?.data?.errors) {
    return Object.values(err.response.data.errors).flat().join(" ");
  }
  return err.response?.data?.message || "Something went wrong.";
}
export {
  useAuth as u
};
//# sourceMappingURL=useAuth-CHMkirah.js.map
