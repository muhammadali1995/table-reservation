import { NavLink, useHistory } from "react-router-dom";
import AuthService from './../../services/AuthService';
import { AppBar, Toolbar, Box, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../states/actions/userAction";
const Header = () => {
    const user = useSelector(state => state.user)
    const { restaurant } = useSelector(state => state.restaurant);
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userAction(null));
        AuthService.logout();
        history.push('/login');
    }

    return (
        <AppBar position='static'>
            <Toolbar variant='regular' display='flex'>
                <Box display='flex' flexGrow={1}>
                    <Typography>
                        Reservio
                    </Typography>
                    {restaurant ? (
                        <>
                            <NavLink to="/editor" className='nav-link'>Layout Editor</NavLink>
                            <NavLink to="/reservations" className='nav-link'>Reservation</NavLink>
                            <NavLink to="/reporting" className='nav-link'>Reports</NavLink>
                        </>
                    ) : ""}
                </Box>
                <div className="ms-auto">
                    {!user ? (
                        <>
                            <NavLink
                                className="nav-link"
                                to="/register"
                            >
                                Register
                            </NavLink>
                            <NavLink
                                className="nav-link"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </>
                    ) : (
                        <Button variant="outlined" color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar >
    );
}

export default Header;