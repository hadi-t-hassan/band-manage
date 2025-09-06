import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { PublicOnly, RequireAuth } from './auth/RouteGuards'

const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      { path: '/home', element: <HomePage /> },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}

