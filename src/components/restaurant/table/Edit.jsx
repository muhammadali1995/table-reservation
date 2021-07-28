import { DialogContent, Dialog, DialogTitle, Typography, Button, Box, IconButton } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { TextInput } from "../../form/TextInput";
import TableService from "../../../services/TableService";
import { Error } from "../../form/Error";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Delete } from "@material-ui/icons";
import tableAction from './../../../states/actions/tableAction';


const EditTable = ({ table, show, handleClose, tableAction, tablesState }) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const updateTable = (table) => {
        const tables = tablesState.tables;
        let index = tables.findIndex(t => t._id === table._id)
        tables[index] = table;
        tableAction(tables);
    }

    const deleteTable = () => {
        if (window.confirm('Are you sure delete this table')) {
            TableService.delete(table._id).then(() => {
                const tables = tablesState.tables;
                let index = tables.findIndex(t => t._id === table._id)
                tables.splice(index, 1);
                tableAction(tables);
                handleClose();
            }, error => {
                console.log(error);
            });
        }
    }

    return (
        <>
            <Dialog open={show} onClose={handleClose} aria-labelledby='create new table'>
                <DialogTitle>
                    <Typography>Edit Table</Typography>
                </DialogTitle>
                <DialogContent>
                    {error ? <Error message={error} /> : ""}
                    <Typography>Table {table.referenceNumber}
                        <IconButton onClick={deleteTable}>
                            <Delete color='secondary' />
                        </IconButton>
                    </Typography>
                    <Formik
                        initialValues={{
                            referenceNumber: table.referenceNumber,
                            seats: table.seats,
                        }}
                        validationSchema={Yup.object({
                            seats: Yup.number()
                                .max(30)
                                .min(1)
                                .required("Number of seats is required"),
                        })}
                        onSubmit={async (formData) => {
                            setSubmitting(true);
                            TableService.update(table._id, formData).then(
                                (res) => {
                                    updateTable(res.data);
                                    setSubmitting(false);
                                    handleClose();
                                },
                                (error) => {
                                    setSubmitting(false);
                                    setError(error.response.data);
                                }
                            );
                        }}>
                        <Form>
                            <Box my={1}>
                                <TextInput
                                    className='form-control'
                                    name="seats"
                                    type='number'
                                    min='0'
                                    max='30'
                                    placeholder="Enter number of seats"
                                    label="Number of seats"
                                />
                            </Box>
                            <Box my={1} display='flex' justifyContent='space-between'>
                                <Button
                                    disabled={submitting}
                                    variant='contained'
                                    color='primary'
                                    type="submit">
                                    Save
                                </Button>
                                <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
                            </Box>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )

}


const mapStateToProps = state => {
    return {
        tablesState: state.tables
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    tableAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTable);