import {
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    Button,
} from '@material-ui/core';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { default as reservationService } from '../../../services/ReservationService';
import { default as tableService } from '../../../services/TableService';
import CreateReservation from "./Create";
import EditReservation from './Edit';
import ListOfReservations from "./ListOfReservations";

const ListReservations = () => {

    const [table, setTable] = useState(null);
    const [filters, setFilters] = useState({ table: null, time: 'all' });
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState(null);
    const [showCreateReservation, setShowCreateReservation] = useState(false);
    const [showEditReservation, setShowEditReservation] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetchReservations(filters);
    }, [filters]);

    useEffect(() => {
        tableService.fetchById(id).then(res => {
            setTable(res.data);
        });
    }, [id]);


    const deleteReservation = async (id) => {
        const isConfirmed = window.confirm('Are you sure to delete this reservation')

        if (!isConfirmed) return;

        try {
            await reservationService.delete(id);
            fetchReservations();
        } catch (respError) {
            setError(respError.data);
        }
    }

    const editReservation = (reservation) => {
        setReservation(reservation);
        setShowEditReservation(true);
    }

    const fetchReservations = async () => {
        setFilters(prevState => { prevState['table'] = id; return prevState; })
        const res = await reservationService.fetchByTable(filters);
        setReservations(res.data);
    }

    const onFilterChange = (event) => {
        const value = event.target.value;
        setFilters((prevState) => ({
            ...prevState,
            'time': value
        }));
    }

    const openCreateReservationModal = () => setShowCreateReservation(true);

    const handleClose = () => {
        setShowCreateReservation(false);
        fetchReservations();
    };

    const handleEditClose = () => {
        setShowEditReservation(false);
        fetchReservations();
    }

    const filterView = (
        <Box component='div' width='200px'>
            <InputLabel id="filter-label">Filter by</InputLabel>
            <Select
                labelId="filter-label"
                id="filter-select"
                fullWidth={true}
                value={filters.time || ''}
                onChange={onFilterChange}>
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='past'>Past</MenuItem>
                <MenuItem value='future'>Future</MenuItem>
            </Select>
        </Box>
    );

    const list = (<Box component='div' padding={5}>
        <Box component='div' display='flex' justifyContent='space-between' marginBottom={5}>
            <Typography>List of reservations for Table # {table?.referenceNumber} </Typography>
            <Button variant='contained' color='secondary' onClick={openCreateReservationModal}>Add New Reservation</Button>
        </Box>
        <Box component='div' display='flex' justifyContent='flex-end'>
            {filterView}
        </Box>
        <ListOfReservations reservations={reservations} deleteReservation={deleteReservation} editReservation={editReservation} />
        {showCreateReservation ? <CreateReservation table={table} show={showCreateReservation} handleClose={handleClose} /> : ''}
        {reservation ? <EditReservation reservation={reservation} show={showEditReservation} handleClose={handleEditClose} /> : ''}
    </Box>
    );

    return table ? list : '';
}

export default ListReservations;