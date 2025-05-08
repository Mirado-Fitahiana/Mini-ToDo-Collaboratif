import React, { useEffect, useState } from 'react';
import { Container, Button, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';
import { URL_TACHE } from '../Constante';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';


function Taches() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [id_user, setId_user] = useState(user ? user.id : null);
    const [id_attributeur, setId_attributeur] = useState(user ? user.id : null);

    const [taches, setTaches] = useState([]);
    const [description, setDescription] = useState('');
    const [priorite, setPriorite] = useState(1);
    const [editingTache, setEditingTache] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            fetchTaches();
        }
    }, [user, navigate]);
    
    const fetchTaches = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get(URL_TACHE, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTaches(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
        }
    };

    const createTache = async () => {
        try {
            const token = localStorage.getItem('access');
            await axios.post(URL_TACHE, { description, priorite, id_user, id_attributeur }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDescription('');
            setPriorite(1);
            setOpen(false);
            fetchTaches();
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error);
        }
    };

    const updateTache = async (tache) => {
        try {
            const token = localStorage.getItem('access');
            await axios.put(`${URL_TACHE}${tache.id}/`, { description, priorite, id_user, id_attributeur  }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingTache(null);
            setDescription('');
            setPriorite(1);
            setOpen(false);
            fetchTaches();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
        }
    };

    const deleteTache = async (id) => {
        try {
            const token = localStorage.getItem('access');
            await axios.delete(`${URL_TACHE}${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTaches();
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    };

    const handleOpenModal = () => {
        setOpen(true);
        setDescription('');
        setPriorite(1);
    };

    const handleEdit = (tache) => {
        setEditingTache(tache);
        setDescription(tache.description);
        setPriorite(tache.priorite);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setEditingTache(null);
        setDescription('');
        setPriorite(1);
    };

    return (
        <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Box p={4} bgcolor="#f4f4f4" boxShadow={4} borderRadius={3}>
                <Typography variant="h4" align="center" gutterBottom color="#3f51b5">Mes Tâches</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, mb: 3, backgroundColor: '#1976d2', borderRadius: 2, fontWeight: 'bold' }}
                    startIcon={<Add />}
                    onClick={handleOpenModal}
                >
                    Ajouter une Tâche
                </Button>
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#3f51b5' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priorité</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date d'Attribution</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {taches.map((tache) => (
                                <TableRow key={tache.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                    <TableCell>{tache.description}</TableCell>
                                    <TableCell>{tache.priorite === 1 ? 'URGENT' : tache.priorite === 2 ? 'MOYEN' : 'FAIBLE'}</TableCell>
                                    <TableCell>{tache.date_attribution ? new Date(tache.date_attribution).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Non définie'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleEdit(tache)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => deleteTache(tache.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={handleDialogClose} fullWidth>
                    <DialogTitle>{editingTache ? 'Modifier Tâche' : 'Ajouter Tâche'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            select
                            label="Priorité"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={priorite}
                            onChange={(e) => setPriorite(parseInt(e.target.value))}
                            SelectProps={{ native: true }}
                        >
                            <option value={1}>URGENT</option>
                            <option value={2}>MOYEN</option>
                            <option value={3}>FAIBLE</option>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">Annuler</Button>
                        <Button onClick={editingTache ? () => updateTache(editingTache) : createTache} color="primary">
                            {editingTache ? 'Enregistrer' : 'Ajouter'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
        </>
    );
}

export default Taches;
