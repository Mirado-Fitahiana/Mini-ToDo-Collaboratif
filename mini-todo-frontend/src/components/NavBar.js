import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.username) {
            setUsername(userData.username);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    Gestion des Tâches
                </Typography>
                {username && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {username}
                        </Typography>
                    </Box>
                )}
                <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 'bold' }}>
                    Déconnexion
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
