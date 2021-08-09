import { Grid } from '@material-ui/core';
import { useEffect, useState } from "react";
import ReportTable from './ReportTable';
import { default as reservationService } from './../../services/ReservationService';

const Report = () => {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        reservationService.fetchAllByRestaurant().then(res => {
            const rs = res.data;

            const data = Object.keys(rs).reduce((accumulator, key) => {
                accumulator.push(...rs[key]);
                return accumulator;
            }, []);
            setReservations(data);
        })
    }, []);

    return (<Grid margin={1} container display='grid' className="grid-container" >
        <ReportTable data={reservations} />
    </Grid>)
}
export default Report;