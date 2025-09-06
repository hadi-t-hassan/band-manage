import { api } from './client'

export type AuthUser = {
  id: number
  username: string
  email: string
}

export async function registerUser(payload: {
  username: string
  email: string
  password: string
}) {
  const { data } = await api.post('/auth/register/', payload)
  return data as { user: AuthUser; access: string; refresh: string }
}

export async function loginUser(payload: { username: string; password: string }) {
  const { data } = await api.post('/auth/login/', payload)
  return data as { access: string; refresh: string }
}

export async function getMe() {
  const { data } = await api.get('/auth/me/')
  return data as AuthUser
}

export async function logoutUser(refresh: string) {
  await api.post('/auth/logout/', { refresh })
}

