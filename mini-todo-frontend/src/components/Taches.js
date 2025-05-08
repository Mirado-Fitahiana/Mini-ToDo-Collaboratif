import React, { useEffect, useState } from 'react';
import { Container, Button, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';
import { URL_TACHE, URL_USERS } from '../Constante';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';


function Taches() {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [id_attributeur] = useState(user ? user.id : null);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [description, setDescription] = useState('');
    const [priorite, setPriorite] = useState(1);
    const [editingTache, setEditingTache] = useState(null);
    const [open, setOpen] = useState(false);
    const [tachesAssignees, setTachesAssignees] = useState([]);
    const [tachesAttribuees, setTachesAttribuees] = useState([]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [tacheToDelete, setTacheToDelete] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            fetchTaches();
            fetchUsers();
        }
    }, [user, navigate]);

    // Récupérer les noms des attributaires pour les tâches assignées
    const fetchAttributors = async (tasks) => {
        try {
            const token = localStorage.getItem('access');
            const updatedTasks = await Promise.all(tasks.map(async (task) => {
                const response = await axios.get(`${URL_USERS}${task.id_attributeur}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return {
                    ...task,
                    attributeur_name: response.data.username
                };
            }));
            setTachesAssignees(updatedTasks);
        } catch (error) {
            console.error("Erreur lors de la récupération des attributaires :", error);
        }
    };

    const fetchAttributes = async (tasks) => {
        try {
            const token = localStorage.getItem('access');
            const updatedTasks = await Promise.all(tasks.map(async (task) => {
                const response = await axios.get(`${URL_USERS}${task.id_user}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return {
                    ...task,
                    attributes_name: response.data.username
                };
            }));
            setTachesAttribuees(updatedTasks);
        } catch (error) {
            console.error("Erreur lors de la récupération des attributaires :", error);
        }
    };

    const fetchTaches = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get(URL_TACHE, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const assignedTasks = response.data.filter(t => t.id_user === user.id);
            const attributedTasks = response.data.filter(t => t.id_attributeur === user.id);
            setTachesAssignees(assignedTasks);
            setTachesAttribuees(attributedTasks);
            await fetchAttributors(assignedTasks);
            await fetchAttributes(attributedTasks);


        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
        }
    };
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.get(URL_USERS, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const filteredUsers = response.data.filter(u => u.id !== user.id);
            setUsers(filteredUsers);


        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
        }
    };
    const createTache = async () => {
        try {
            const token = localStorage.getItem('access');
            await axios.post(URL_TACHE, { description, priorite, id_user: selectedUser, id_attributeur }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDescription('');
            setSelectedUser('');
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
            await axios.put(`${URL_TACHE}${tache.id}/`, { description, priorite, id_user: selectedUser || tache.id_user, id_attributeur }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingTache(null);
            setDescription('');
            setSelectedUser('');
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
        setSelectedUser(tache.id_user);
        setOpen(true);
    };

    const handleDeleteConfirm = (tache) => {
        setTacheToDelete(tache);
        setConfirmOpen(true);
    };

    const handleDeleteCancel = () => {
        setTacheToDelete(null);
        setConfirmOpen(false);
    };
    const handleDeleteConfirmAction = async () => {
        try {
            const token = localStorage.getItem('access');
            await axios.delete(`${URL_TACHE}${tacheToDelete}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConfirmOpen(false);
            fetchTaches();
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
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
                    {/* Tâches Assignées */}
                    <Typography variant="h5" align="center" gutterBottom color="#1976d2">Tâches Assignées à Moi</Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, mb: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priorité</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date d'Attribution</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Attribué par</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tachesAssignees.map((tache) => (
                                    <TableRow key={tache.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                        <TableCell>{tache.description}</TableCell>
                                        <TableCell>{tache.priorite === 1 ? 'URGENT' : tache.priorite === 2 ? 'MOYEN' : 'FAIBLE'}</TableCell>
                                        <TableCell>{tache.date_attribution ? new Date(tache.date_attribution).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Non définie'}</TableCell>
                                        <TableCell>{tache.attributeur_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Tâches Attribuées */}
                    <Typography variant="h5" align="center" gutterBottom color="#1976d2">Tâches que j'ai attribuées</Typography>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#3f51b5' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priorité</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date d'Attribution</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Attribué à</TableCell>
                                    <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tachesAttribuees.map((tache) => (
                                    <TableRow key={tache.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                        <TableCell>{tache.description}</TableCell>
                                        <TableCell>{tache.priorite === 1 ? 'URGENT' : tache.priorite === 2 ? 'MOYEN' : 'FAIBLE'}</TableCell>
                                        <TableCell>{tache.date_attribution ? new Date(tache.date_attribution).toLocaleString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Non définie'}</TableCell>
                                        <TableCell>{tache.attributes_name}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => handleEdit(tache)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDeleteConfirm(tache.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Modal de confirmation de suppression */}
                    <Dialog open={confirmOpen} onClose={handleDeleteCancel} fullWidth>
                        <DialogTitle>Confirmation de suppression</DialogTitle>
                        <DialogContent>
                            <Typography>Voulez-vous vraiment supprimer cette tâche ?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel} color="secondary">Annuler</Button>
                            <Button onClick={handleDeleteConfirmAction} color="error">Supprimer</Button>
                        </DialogActions>
                    </Dialog>

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
                            <TextField
                                select
                                label="Attribuer à"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                {users.map((u) => (
                                    <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
                                ))}
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
