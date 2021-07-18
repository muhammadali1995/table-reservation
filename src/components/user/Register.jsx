import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { TextInput } from "../form/TextInput";
import { Formik } from "formik";
import { Form } from "formik";
import { Error } from "../form/Error";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import userAction from "../../states/actions/userAction";

export const RegisterUserForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  return (
    <Grid container justifyContent='center' alignItems='center' direction='column' className='h-100'>
      <Grid item xs={12} sm={6} md={4} my='auto'>
        <Typography variant='h5'>
          Sign up
        </Typography>
        {error ? <Error message={error} /> : ""}
        <Formik
          initialValues={{
            name: "",
            email: "",
            role: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Must be 2 character or more")
              .required("Name is required"),
            email: Yup.string()
              .email("Invalid email addresses")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Must be more than 6 characters")
              .required("Passwrod is required"),
            passwordConfirmation: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Password Cofirmation is required"),
          })}

          onSubmit={async (formData) => {
            setSubmitting(true);
            AuthService.register(formData).then(
              (res) => {
                setSubmitting(false);

                dispatch(userAction(res.data));
                
                AuthService.saveUser(res.data);
                history.push("/");
              },
              (error) => {
                setSubmitting(false);
                setError(error);
              }
            );
          }}
        >
          <Form>
            <TextInput
              className="form-control"
              name="name"
              type="text"
              placeholder="John Doe"
              label="Name"
            />
            <TextInput
              className="form-control"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              label="Email"
            />
            <TextInput
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />
            <TextInput
              className="form-control"
              name="passwordConfirmation"
              type="password"
              label="Confirm password"
              placeholder="Confirm password"
            />
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={submitting}>
                Register
              </Button>
            </div>
          </Form>
        </Formik>
        <p className="font-weight-bold py-2 text-secondary">Have you got an account yet? Please
          <Link to="/login"> login.</Link>
        </p>
      </Grid>
    </Grid>
  );
};