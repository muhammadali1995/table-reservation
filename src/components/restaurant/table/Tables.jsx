import { Box } from '@material-ui/core';
import Table from './Table';
import { useState } from "react";
import CreateTable from './Create';
import EditTable from './Edit';

const Tables = ({ referenceNumbers, existingTables }) => {
    const [number, setNumber] = useState();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [table, setTable] = useState();

    const handleClose = () => setShow(false);
    const handleEditClose = () => {
        setShowEdit(false);
        setTable(null)
    }

    const Tables = (referenceNumbers.map(rn => (
        <Box width={1 / 11} key={rn} textAlign='center' justifyContent='center' alignSelf='center'>
            <Table number={rn}
                setTable={setTable}
                setNumber={setNumber}
                setShow={setShow}
                setShowEdit={setShowEdit}
                table={existingTables[rn]} />
        </Box>)
    ));

    return (<>
        {Tables}
        <CreateTable number={number} show={show} handleClose={handleClose} />
        {table ? <EditTable table={table} show={showEdit} handleClose={handleEditClose} /> : ''}
    </>)
}

export default Tables;