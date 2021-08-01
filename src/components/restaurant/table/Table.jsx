import { IconButton, Box, Typography } from "@material-ui/core";
import { AddCircle, Edit } from '@material-ui/icons';
const Table = ({ number, table, setNumber, setShow, setTable, setShowEdit }) => {

    const handleShow = (number) => {
        setNumber(number);
        setShow(true);
    }

    const handleEditShow = () => {
        setTable(table);
        setShowEdit(true);
    };

    return (
        <>
            <Box border={1} width={1} flexGrow={1}>
                Table# {number}
                <br />
                {table ?
                    <>
                        <Typography>Seats: {table.seats}</Typography>
                        <IconButton onClick={handleEditShow}>
                            <Edit color='primary' />
                        </IconButton>
                    </>
                    : (<IconButton variant='light' onClick={() => handleShow(number)}>
                        <AddCircle color="primary" />
                    </IconButton>)}
            </Box>
        </>
    )
}
export default Table;