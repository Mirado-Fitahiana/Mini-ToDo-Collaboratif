import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL_REGISTER } from '../Constante';

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
            const response = await axios.post(URL_REGISTER, {
                username,
                email,
                password,
                first_name: firstName,
                last_name: lastName
            });
            setSuccess('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(`Erreur lors de l'enregistrement. Vérifiez vos informations.`);	
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={5} p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
                <Typography variant="h4" align="center" gutterBottom>Inscription</Typography>
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
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        S'inscrire
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register;