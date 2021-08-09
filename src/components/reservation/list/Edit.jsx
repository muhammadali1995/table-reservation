import { Dialog, DialogContent, DialogContentText, DialogTitle, FormControl } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Box, MenuItem } from '@material-ui/core';
import { TextInput } from "../../form/TextInput";
import { useState } from "react";
import { CustomSelect } from "../../form/Select";
import { BOOKING_TIMES } from './../../../constants/bookingTimes';
import { default as reservationService } from './../../../services/ReservationService';
import * as moment from 'moment';

const EditReservation = ({ show, handleClose, reservation }) => {
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const date = new Date(reservation.date).toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const hourOptions = (BOOKING_TIMES.map(hour => <MenuItem key={hour} value={hour}>
        {hour}
    </MenuItem>));

    const reservationForm = (<Formik
        initialValues={{
            date: date,
            table: reservation.table,
            start: reservation.start,
            customerName: reservation.customerName,
            customerPhoneNumber: reservation.customerPhoneNumber
        }}
        validationSchema={Yup.object({
            start: Yup.string()
                .required("Start time required"),
            date: Yup.date().required('Date is required'),
            customerName: Yup.string().required('Customer Name is required'),
            customerPhoneNumber: Yup.string().required('Customer Phone Number is required')
        })}
        onSubmit={async (formData) => {
            setSubmitting(true);
            setError('');
            const { date } = formData;
            const { start } = formData;
            const datetime = moment(date + ' ' + start).format('');

            formData.date = datetime;
            reservationService.update(reservation._id, formData).then(res => {
                setSubmitting(false);
                handleClose();
            }, (errResp) => {
                setSubmitting(false);
                if (errResp.data) {
                    setError(errResp.data);
                } else {
                    setError({ message: 'Time is already booked, please choose another time' });
                }
            })
        }}>
        {formikProps =>
        (<Form>
            <FormControl className='form-control'>
                <TextInput
                    name="date"
                    min={yesterday}
                    type='date'
                    placeholder="Enter Date"
                    label="Reservation Date"
                />
            </FormControl>
            <FormControl className='form-control'>
                <CustomSelect
                    name='start'
                    placeholder='Select Start Time'
                    label='Reservation time'>
                    {hourOptions}
                </CustomSelect>
            </FormControl>
            <FormControl className='form-control'>
                <TextInput
                    name='customerName'
                    placeholder='Enter Customer Name'
                    label='Customer Name'
                />
            </FormControl>
            <FormControl className='form-control'>
                <TextInput
                    type='number'
                    name='customerPhoneNumber'
                    placeholder='Enter Customer Phone Number'
                    label='Customer Phone Number'
                />
            </FormControl>
            <Box my={1} display='flex' justifyContent='space-between'>
                <Button
                    disabled={submitting || !formikProps.isValid}
                    variant='contained'
                    color='primary'
                    type="submit">
                    Save
                </Button>
                <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
            </Box>
        </Form>)}
    </Formik>);

    return <Dialog open={show} onClose={handleClose}>
        <DialogTitle id='title'>Update Reservation</DialogTitle>
        <DialogContent>
            {error ? <DialogContentText color='secondary'> {error.message}</DialogContentText> : ''}
            {reservationForm}
        </DialogContent>
    </Dialog>
}

export default EditReservation;