import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { register } from '../services/authService';
import { AxiosError } from 'axios';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    if (!email || !password || !username) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await register(email, password, username);
      setSuccess('Registration successful!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed, please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Username"
          type="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSignUp}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPage;
