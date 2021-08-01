import { connect } from 'react-redux';
import ReservationTable from './ReservationTable';
import { Box } from '@material-ui/core';

const ReservationTables = ({ referenceNumbers, existingTables }) => {

    const Tables = (referenceNumbers.map(rn => (
        <Box width={1 / 11} key={rn} textAlign='center' justifyContent='center' alignSelf='center'>
            <ReservationTable referenceNumber={rn} table={existingTables[rn]} />
        </Box>)
    ));
    return <>
        {Tables}
    </>;
}

export default connect()(ReservationTables);