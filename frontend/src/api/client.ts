import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from '../utils/tokenStorage'

const baseURL = import.meta.env.VITE_API_URL?.toString() || 'http://localhost:8000/api'

export const api = axios.create({ baseURL, withCredentials: false })

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }
  return config
})

async function refreshAccessToken(): Promise<string> {
  if (isRefreshing && refreshPromise) return refreshPromise
  isRefreshing = true
  refreshPromise = (async () => {
    const refresh = getRefreshToken()
    if (!refresh) throw new Error('No refresh token')
    const { data } = await axios.post(
      `${baseURL}/auth/refresh/`,
      { refresh },
      { withCredentials: false }
    )
    const newAccess = data.access as string
    setAccessToken(newAccess)
    return newAccess
  })()
  try {
    const token = await refreshPromise
    return token
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const newAccess = await refreshAccessToken()
        original.headers = original.headers ?? {}
        original.headers.Authorization = `Bearer ${newAccess}`
        return api(original)
      } catch (e) {
        clearTokens()
        // Fall-through to reject, caller will handle redirect
      }
    }
    return Promise.reject(error)
  }
)

