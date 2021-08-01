import './../../index.css';
import { useEffect, useState } from "react"
import tableAction from "../../states/actions/tableAction";
import reservationsAction from "../../states/actions/reservationAction";
import { default as tableService } from "../../services/TableService";
import { default as reservationService } from "../../services/ReservationService";
import { Typography, Grid } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ReservationTables from './table/ReservationTables';


const RestaurantReservation = ({ tablesState, tableAction, reservationState, reservationsAction }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        tableService.fetchAll().then(res => {
            tableAction(res.data);
            setLoading(false);
        });

        reservationService.fetchAll().then(res => {
            reservationsAction(res.data);
            setLoading(false);
        });
    }, [tableAction]);


    const existingTables = tablesState.tables.reduce((acc, current) => {
        acc[current.referenceNumber] = current;
        return acc;
    }, {});

    const existingReservations = reservationState.reservations;

    let referenceNumbers = [];
    for (let i = 1; i < 151; i++) {
        referenceNumbers[i] = i;
    }

    return loading ? (<Typography>Loading</Typography>) :
        (<Grid margin={1} container display='grid' className="grid-container" >
            <ReservationTables referenceNumbers={referenceNumbers}
                existingTables={existingTables}
                reservations={existingReservations} />
        </Grid>)
}

const mapStateToProps = state => {
    return {
        tablesState: state.tables,
        reservationState: state.reservations
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    tableAction,
    reservationsAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReservation);