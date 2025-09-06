import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { useAuth } from '../auth/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()
  return (
    <Box>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <HomeRoundedIcon color="primary" />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Avatar sx={{ width: 32, height: 32 }}>{user?.username.at(0)?.toUpperCase()}</Avatar>
          <IconButton color="primary" onClick={logout} aria-label="Logout">
            <LogoutRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Hello, {user?.username}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          You’re logged in. This is a protected page.
        </Typography>
        <Button variant="outlined" onClick={logout} startIcon={<LogoutRoundedIcon />}>
          Logout
        </Button>
      </Container>
    </Box>
  )
}

