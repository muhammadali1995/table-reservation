import { connect } from 'react-redux';
import ReservationTable from './ReservationTable';
import { Box } from '@material-ui/core';
import { useState } from "react";
import ListReservations from "../list/List";

const ReservationTables = ({ referenceNumbers, existingTables, reservations }) => {

    const [currentTable, setCurrentTable] = useState(null);

    const Tables = (referenceNumbers.map(rn => (
        <Box width={1 / 11} key={rn} textAlign='center' justifyContent='center' alignSelf='center'>
            <ReservationTable setTable={setCurrentTable} referenceNumber={rn} table={existingTables[rn]} />
        </Box>)
    ));
    return <>
        {Tables}
    </>;
}

export default connect()(ReservationTables);