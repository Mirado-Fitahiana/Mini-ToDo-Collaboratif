import React, { useState } from 'react';
import {  TextField, Button, Typography, Alert, Avatar, Grid, Paper } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL_REGISTER, URL_LOGIN } from '../Constante';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URL_REGISTER, {
                username,
                email,
                password,
                first_name: firstName,
                last_name: lastName
            });
            setSuccess('Compte créé avec succès. Connexion en cours...');
            setError('');

            const loginResponse = await axios.post(URL_LOGIN, {
                username,
                password
            });
            localStorage.setItem('access', loginResponse.data.access);
            localStorage.setItem('refresh', loginResponse.data.refresh);
            localStorage.setItem('user', JSON.stringify(loginResponse.data));

            navigate('/taches');
        } catch (err) {
            setError(`Erreur lors de l'enregistrement. Vérifiez vos informations.`);    
            setSuccess('');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={11} sm={4} md={4} lg={3}>
                <Paper elevation={10} sx={{ p: 4, borderRadius: 3 }}>
                    <Grid container direction="column" alignItems="center">
                        <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
                            <PersonAdd />
                        </Avatar>
                        <Typography variant="h5" gutterBottom>Inscription</Typography>
                    </Grid>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <form onSubmit={handleRegister}>
                        <TextField
                            label="Nom d'utilisateur"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Adresse e-mail"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Prénom"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Nom de famille"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            S'inscrire
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Register;
