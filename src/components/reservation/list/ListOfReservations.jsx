import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
const ListOfReservations = ({ reservations }) => {
    return (
        <TableContainer p={4} aria-labelledby='create new table'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell px={1}>Date</TableCell>
                        <TableCell px={1}>Time</TableCell>
                        <TableCell px={1}>Customer Name</TableCell>
                        <TableCell px={1}>Customer Contact Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map(rv => (
                        <TableRow key={rv._id}>
                            <TableCell px={1} >{rv.date}</TableCell>
                            <TableCell px={1} >{rv.start}</TableCell>
                            <TableCell px={1} >{rv.customerName}</TableCell>
                            <TableCell px={1} >{rv.customerPhoneNumber} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ListOfReservations;