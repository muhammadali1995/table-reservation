import "./../../index.css";
import { Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { default as tableService } from "../../services/TableService";
import { bindActionCreators } from "redux";
import tableAction from './../../states/actions/tableAction';
import Tables from './table/Tables';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const RestaurantEditor = ({ tablesState, tableAction }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tableService.fetchAll().then(res => {
            tableAction(res.data);
            setLoading(false);
        }, error => {
            console.log(error);
        });
    }, [tableAction]);

    const existingTables = tablesState.tables.reduce((acc, current) => {
        acc[current.referenceNumber] = current;
        return acc;
    }, {});

    let referenceNumbers = [];
    for (let i = 1; i < 151; i++) {
        referenceNumbers[i] = i;
    }

    return loading ? (<Typography>Loading</Typography>) :
        (<Grid margin={1} container display='grid' className="grid-container" >
            <DndProvider backend={HTML5Backend}>
                <Tables tables={tablesState.tables} referenceNumbers={referenceNumbers} existingTables={existingTables} />
            </DndProvider>
        </Grid>)

}


const mapStateToProps = state => {
    return {
        tablesState: state.tables
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    tableAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEditor);