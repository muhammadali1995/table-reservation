import "./../Restaurant.css";
import CreateTable from "./Create";
import { useState } from "react";
import { IconButton, Box } from "@material-ui/core";
import { AddCircle } from '@material-ui/icons';
const Table = ({ number }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Box border={1} width={1} flexGrow={1}>
                <div>
                    Box # {number}
                    <br></br>
                    <IconButton variant='light' onClick={handleShow}>
                        <AddCircle color="primary" />
                    </IconButton>
                </div>
            </Box>
            <CreateTable number={number} show={show} handleClose={handleClose} />
        </>
    )
}
export default Table;