import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Gestion des Tâches
                </Typography>
                <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 'bold' }}>
                    Déconnexion
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
