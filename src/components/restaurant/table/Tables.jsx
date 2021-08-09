import { Box } from '@material-ui/core';
import Table from './Table';
import { useState } from "react";
import CreateTable from './Create';
import EditTable from './Edit';
import tableService from './../../../services/TableService';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import tableAction from './../../../states/actions/tableAction';

const Tables = ({ referenceNumbers, existingTables, tableAction, tables }) => {
    const [number, setNumber] = useState();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [table, setTable] = useState();

    const handleClose = () => setShow(false);
    const handleEditClose = () => {
        setShowEdit(false);
        setTable(null)
    }
    
    const swap = (data) => {
        tableService.swap(data).then(res => {
            refresh(res.data);
        });
    }

    const refresh = (sTables) => {
        
        sTables.forEach(st => {
          const index = tables.findIndex(t => t._id === st._id);
          tables[index] = st;      
        });

        tableAction(tables);
    } 

    const Tables = (referenceNumbers.map(rn => (
        <Box width={1 / 11} key={rn} textAlign='center' justifyContent='center' alignSelf='center'>
            <Table number={rn}
                setTable={setTable}
                setNumber={setNumber}
                setShow={setShow}
                setShowEdit={setShowEdit}
                swap={swap}
                table={existingTables[rn]} />
        </Box>)
    ));

    return (<>
        {Tables}
        <CreateTable number={number} show={show} handleClose={handleClose} />
        {table ? <EditTable table={table} show={showEdit} handleClose={handleEditClose} /> : ''}
    </>)
}

const mapDispatchToProps = dispatch => bindActionCreators({
    tableAction
}, dispatch);

export default connect(null, mapDispatchToProps)(Tables);