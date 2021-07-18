import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { RegisterUserForm } from "./components/user/Register";
import { LoginForm } from './components/user/Login'
import axios from "axios";
import { ENV } from "./constants/environment";
import { useEffect, useState } from "react";
import { Home } from './components/home/Home';
import RestaurantEditor from './components/restaurant/Editor';
import { connect, useDispatch } from "react-redux";
import userAction from './states/actions/userAction';
import { CircularProgress } from '@material-ui/core';


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



function App({ user, userAction }) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    let currentUser = localStorage.getItem("user");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      dispatch(userAction(currentUser));
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <CircularProgress className="position-absolute mx-96 my-96" color="primary" /> :
        (<div>
          <Switch>
            {user ? (
              <>
                <Route path="/" match='exact'><Home /></Route>
                <Route path="/editor"><RestaurantEditor /></Route>
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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userAction: (payload) => dispatch(userAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
