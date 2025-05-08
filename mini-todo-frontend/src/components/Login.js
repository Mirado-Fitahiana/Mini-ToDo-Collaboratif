import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Avatar, Grid, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/taches');
        } catch (err) {
            setError(`Nom d'utilisateur ou mot de passe incorrect`);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={11} sm={8} md={4} lg={3}>
                <Paper elevation={10} sx={{ p: 4, borderRadius: 3 }}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography variant="h5" gutterBottom>Connexion</Typography>
                    </Grid>

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
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
                            Se connecter
                        </Button>
                    </form>
                    <Button component={Link} to="/register" variant="text" color="secondary" fullWidth>
                        Créer un compte
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Login;
