import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material'
import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      await login(values)
      navigate('/home', { replace: true })
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Invalid credentials')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Welcome back
        </Typography>
        <Typography color="text.secondary">Login to access your account</Typography>
      </Box>
      <Card>
        <CardContent>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Username"
              autoComplete="username"
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
            <Typography textAlign="center" color="text.secondary">
              Don’t have an account?{' '}
              <Link href="/register" underline="hover">
                Create one
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

