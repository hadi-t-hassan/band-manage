import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Box, CircularProgress } from '@mui/material'

export function RequireAuth() {
  const { isAuthenticated, initializing } = useAuth()
  if (initializing)
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export function PublicOnly() {
  const { isAuthenticated, initializing } = useAuth()
  if (initializing)
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />
}

