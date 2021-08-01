import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from "@material-ui/core";
import * as moment from 'moment';
import { Edit, Delete } from '@material-ui/icons';

const ListOfReservations = ({ reservations, deleteReservation, editReservation }) => {
    const formatDate = (date) => moment(date).format('DD-MM-YYYY')

    return (
        <TableContainer p={4} aria-labelledby='create new table'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Contact Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map(rv => (
                        <TableRow key={rv._id}>
                            <TableCell>{formatDate(rv.date)}</TableCell>
                            <TableCell>{rv.start}</TableCell>
                            <TableCell>{rv.customerName}</TableCell>
                            <TableCell>{rv.customerPhoneNumber} </TableCell>
                            <TableCell>
                                <IconButton onClick={() => editReservation(rv)}>
                                    <Edit color='primary' />
                                </IconButton>
                                <IconButton onClick={() => deleteReservation(rv._id)}>
                                    <Delete color='secondary' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListOfReservations;