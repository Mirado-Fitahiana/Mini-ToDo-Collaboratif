import React, { useEffect, useState } from 'react';
import { Container, Button, Typography, Box, TextField, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { URL_TACHE } from '../Constante';

function Taches() {
    const [taches, setTaches] = useState([]);
    const [description, setDescription] = useState('');
    const [priorite, setPriorite] = useState(1);
    const [editingTache, setEditingTache] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTaches();
    }, []);

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
            await axios.post(URL_TACHE, { description, priorite }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDescription('');
            setPriorite(1);
            fetchTaches();
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error);
        }
    };

    const updateTache = async (tache) => {
        try {
            const token = localStorage.getItem('access');
            await axios.put(`${URL_TACHE}${tache.id}/`, { description, priorite }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingTache(null);
            setDescription('');
            setPriorite(1);
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
        <Container maxWidth="sm">
            <Box my={5} p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
                <Typography variant="h4" align="center" gutterBottom>Mes Tâches</Typography>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Priorité"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={priorite}
                    onChange={(e) => setPriorite(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={editingTache ? () => updateTache(editingTache) : createTache}
                >
                    {editingTache ? 'Mettre à jour la tâche' : 'Ajouter une tâche'}
                </Button>

                <List sx={{ mt: 4 }}>
                    {taches.map((tache) => (
                        <ListItem key={tache.id} secondaryAction={
                            <>
                                <IconButton edge="end" color="primary" onClick={() => handleEdit(tache)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" color="error" onClick={() => deleteTache(tache.id)}>
                                    <Delete />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={tache.description}
                                secondary={`Priorité : ${tache.priorite}`}
                            />
                        </ListItem>
                    ))}
                </List>

                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>Modifier Tâche</DialogTitle>
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
                            label="Priorité"
                            variant="outlined"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={priorite}
                            onChange={(e) => setPriorite(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">Annuler</Button>
                        <Button onClick={() => updateTache(editingTache)} color="primary">Enregistrer</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Taches;
