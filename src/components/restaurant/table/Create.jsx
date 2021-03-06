import { DialogContent, Dialog, DialogTitle, Typography, Button, Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { TextInput } from "../../form/TextInput";
import TableService from "../../../services/TableService";
import { Error } from "../../form/Error";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import tableAction from './../../../states/actions/tableAction';

const CreateTable = ({ number, show, handleClose, tableAction, tablesState }) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const pushToTables = (table) => {
        const tables = tablesState.tables;
        tables.push(table);
        tableAction(tables);
    }

    return (
        <>
            <Dialog open={show} onClose={handleClose} aria-labelledby='create new table'>
                <DialogTitle>
                    <Typography>Add New Table</Typography>
                </DialogTitle>
                <DialogContent>
                    {error ? <Error message={error} /> : ""}
                    <Formik
                        initialValues={{
                            referenceNumber: number,
                            seats: 0,
                        }}
                        validationSchema={Yup.object({
                            seats: Yup.number()
                                .max(30)
                                .min(1)
                                .required("Number of seats is required"),
                        })}
                        onSubmit={async (formData) => {
                            setSubmitting(true);
                            TableService.create(formData).then(
                                (res) => {
                                    pushToTables(res.data);
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
                                    Add
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTable);