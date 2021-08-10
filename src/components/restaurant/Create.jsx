import { useState } from "react";
import * as Yup from "yup";
import { TextInput } from "../form/TextInput";
import { Formik, Form } from "formik";
import { Error } from "../form/Error";
import RestaurantService from "../../services/RestaurantService";
import { Button, Grid, Typography, Box } from "@material-ui/core";
import { useHistory } from 'react-router';
import { connect } from "react-redux";
import restaurantAction from './../../states/actions/restaurantAction';
import { bindActionCreators } from "redux";

const CreateRestaurant = ({restaurantAction}) => {
    
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    return (
        <Grid container justifyContent='center' alignItems='center' direction='column' className='h-100'>
            <Grid item xs={12} sm={6} md={4} my='auto'>
                <Typography variant='h5'>
                    Add Restaurant
                </Typography>

                {error ? <Error message={error} /> : ""}

                <Formik
                    initialValues={{
                        name: "",
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(1, "Name must be more than a character")
                            .required("Name is required"),
                    })}
                    onSubmit={async (formData) => {
                        setSubmitting(true);
                        RestaurantService.create(formData).then(
                            (res) => {
                                restaurantAction(res.data);
                                setSubmitting(false);
                                history.push('/editor');
                            },
                            (error) => {
                                setSubmitting(false);
                                setError(error.response.data);
                            }
                        );
                    }}>
                    <Form>
                        <TextInput
                            className="form-control"
                            name="name"
                            type="text"
                            placeholder="Restaurant Name"
                            label="Name"
                        />
                        <Box>
                            <Button
                                width={1}
                                variant='contained'
                                color='primary'
                                disabled={submitting}
                                type="submit">
                                Add
                            </Button>
                        </Box>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => {
    return {
        tablesState: state.tables
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    restaurantAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurant);