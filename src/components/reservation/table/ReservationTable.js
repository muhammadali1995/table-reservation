import { Typography, Box } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ReservationTable = ({ referenceNumber, table }) => {

    return <Box border={1} width={1} flexGrow={1}>
        {
            table ? <>
                <Typography>Table #: {referenceNumber}</Typography>
                <Typography>Seats: {table.seats} </Typography>
                <Link to={`/reservations/${table._id}`}>
                    <Visibility color='primary' />
                </Link>
            </> : 'No table'
        }

    </Box>
}

export default ReservationTable;