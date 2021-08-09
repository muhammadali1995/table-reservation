import { TableContainer, TablePagination, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import * as moment from 'moment';
import { useState } from "react";

const ReportTable = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formatDate = (date) => moment(date).format('DD-MM-YYYY')
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Table #</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Phone Number</TableCell>
                            <TableCell>Reservation Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row" align='left'>
                                    Table {row.table.referenceNumber}
                                </TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.customerPhoneNumber}</TableCell>
                                <TableCell>{formatDate(row.date)},{row.start}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>)
}
export default ReportTable;