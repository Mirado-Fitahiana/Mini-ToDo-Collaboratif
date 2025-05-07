import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN } from '../Constante';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL_LOGIN, {
                username,
                password
            });
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/taches');
        } catch (err) {
            setError(`Nom d'utilisateur ou mot de passe incorrect`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={5} p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
                <Typography variant="h4" align="center" gutterBottom>Connexion</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Nom d'utilisateur"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Se connecter
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Login;
