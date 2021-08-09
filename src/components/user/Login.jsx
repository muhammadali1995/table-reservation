import { useHistory } from "react-router";
import { useState } from "react";
import * as Yup from "yup";
import { TextInput } from "../form/TextInput";
import { Formik, Form } from "formik";
import { Error } from "../form/Error";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { Button, Typography, Box } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';  
import userAction from "../../states/actions/userAction";

const LoginForm = ({ userAction }) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const saveUser = (user) => {
        AuthService.saveUser(user);
        userAction(user);
        history.push("/");
    }

    return (
        <Grid container justifyContent='center' alignItems='center' direction='column' className='h-100'>
            <Grid item xs={12} sm={6} md={4} my='auto'>
                <Typography variant='h5'>
                    Login
                </Typography>

                <Box width={1}>
                    {error ? <Error message={error} /> : ""}

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().required("Email is required"),
                            password: Yup.string().required("Password is required"),
                        })}
                        onSubmit={async (formData) => {
                            setSubmitting(true);
                            AuthService.login(formData).then(
                                (res) => {
                                    setSubmitting(false);
                                    saveUser(res.data);
                                },
                                (error) => {
                                    console.log(error);
                                    setSubmitting(false);
                                    setError(error.response.data);
                                }
                            );
                        }}>
                        <Form>
                            <Box my={1} width={1}>
                                <TextInput
                                    className='form-control'
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    label="Email"
                                />
                            </Box>
                            <Box my={1}>
                                <TextInput
                                    className='form-control'
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    label="Password"
                                />
                            </Box>
                            <Box my={1} display='flex'  >
                                <Button
                                    disabled={submitting}
                                    variant='contained'
                                    color='primary'
                                    type="submit">
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
                <p className="font-weight-bold py-2 text-secondary">Don't you have account yet? Please
                    <Link to="/register"> sign up.</Link>
                </p>
            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    userAction
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);