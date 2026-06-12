import { reactive, computed } from 'vue'
import axios from 'axios'

// localStorage is not available during SSR — all reads/writes are guarded with import.meta.client
function lsGet(key) {
  if (!import.meta.client) return null
  return localStorage.getItem(key)
}
function lsSet(key, val) {
  if (!import.meta.client) return
  localStorage.setItem(key, val)
}
function lsRemove(key) {
  if (!import.meta.client) return
  localStorage.removeItem(key)
}

const state = reactive({
  user: import.meta.client ? JSON.parse(lsGet('auth_user') || 'null') : null,
  token: import.meta.client ? lsGet('auth_token') : null,
  loading: false,
  error: null,
})

export const useAuth = () => {
  const config = useRuntimeConfig()
  const BASE = config.public.apiUrl?.replace('/anime', '') || '/api'

  const isLoggedIn = computed(() => !!state.token && !!state.user)
  const user       = computed(() => state.user)
  const loading    = computed(() => state.loading)
  const error      = computed(() => state.error)

  function setSession(user, token) {
    state.user  = user
    state.token = token
    lsSet('auth_user', JSON.stringify(user))
    lsSet('auth_token', token)
  }

  function clearSession() {
    state.user  = null
    state.token = null
    lsRemove('auth_user')
    lsRemove('auth_token')
  }

  function authHeaders() {
    return state.token ? { Authorization: `Bearer ${state.token}` } : {}
  }

  async function register(name, email, password, passwordConfirmation) {
    state.loading = true
    state.error   = null
    try {
      const { data } = await axios.post(`${BASE}/auth/register`, {
        name, email, password, password_confirmation: passwordConfirmation,
      })
      setSession(data.user, data.token)
      return { success: true }
    } catch (err) {
      state.error = extractError(err)
      return { success: false, error: state.error }
    } finally {
      state.loading = false
    }
  }

  async function login(email, password) {
    state.loading = true
    state.error   = null
    try {
      const { data } = await axios.post(`${BASE}/auth/login`, { email, password })
      setSession(data.user, data.token)
      return { success: true }
    } catch (err) {
      state.error = extractError(err)
      return { success: false, error: state.error }
    } finally {
      state.loading = false
    }
  }

  async function logout() {
    try {
      await axios.post(`${BASE}/auth/logout`, {}, { headers: authHeaders() })
    } catch (_) {}
    clearSession()
  }

  async function fetchMe() {
    if (!state.token) return
    try {
      const { data } = await axios.get(`${BASE}/auth/me`, { headers: authHeaders(), timeout: 10000 })
      state.user = data.user
      lsSet('auth_user', JSON.stringify(data.user))
    } catch (_) {
      clearSession()
    }
  }

  function loginWithGoogle() {
    if (import.meta.client) window.location.href = `${BASE}/auth/google`
  }

  async function handleGoogleCallback(token) {
    state.token = token
    lsSet('auth_token', token)
    await fetchMe()
    return !!state.user
  }

  return {
    user, isLoggedIn, loading, error,
    register, login, logout, fetchMe,
    loginWithGoogle, handleGoogleCallback, authHeaders,
  }
}

function extractError(err) {
  if (err.response?.data?.errors) {
    return Object.values(err.response.data.errors).flat().join(' ')
  }
  return err.response?.data?.message || 'Something went wrong.'
}
