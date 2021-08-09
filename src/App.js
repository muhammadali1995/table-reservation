import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { ENV } from "./constants/environment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import userAction from './states/actions/userAction';
import { CircularProgress } from '@material-ui/core';

import ListReservations from "./components/reservation/list/List";
import Report from './components/reporting/Report';
import Home from './components/home/Home';
import RestaurantEditor from './components/restaurant/Editor';
import RestaurantReservation from "./components/reservation/Reservation";
import RegisterUserForm from "./components/user/Register";
import LoginForm from './components/user/Login'


axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [ENV.prod.apiUrl, ENV.development.apiUrl];
    const token = localStorage.getItem("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



function App({ userAction, userState }) {
  const [loading, setLoading] = useState(true)
  const { user } = userState;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let currentUser = localStorage.getItem("user");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      userAction(currentUser);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? <CircularProgress className="position-absolute mx-96 my-96" color="primary" /> :
        (<div>
          <Switch>
            {user ? (
              <>
                <Route path="/" match='exact'><Home /></Route>
                <Route path="/editor"><RestaurantEditor /></Route>
                <Route path='/reservations' exact><RestaurantReservation /></Route>
                <Route path='/reservations/:id'><ListReservations /></Route>
                <Route path='/reporting'><Report /></Route>
              </>
            ) : (
              <>
                <Route path="/"> <Redirect to="/login" /></Route>
                <Route path="/login" component={LoginForm}></Route>
                <Route path="/register" component={RegisterUserForm}></Route>
              </>
            )}
          </Switch>
        </div>)
      }
    </>
  );
}

const mapStateToProps = state => {
  return {
    userState: state.user,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  userAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
