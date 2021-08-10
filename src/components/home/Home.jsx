import { useEffect } from "react";
import { useState } from "react";
import Header from "../layout/Header";
import CreateRestaurant from './../restaurant/Create';
import RestaurantService from "../../services/RestaurantService";
import Loader from './../layout/Loader';
import { connect } from "react-redux";
import restaurantAction from "../../states/actions/restaurantAction";
import { Box } from '@material-ui/core';
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

const Home = ({ restaurantState, restaurantAction }) => {

    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = () => {
        RestaurantService.fetchMyRestaurant().then(res => {
            restaurantAction(res.data);
            setBusy(false);
        });
    }

    return (
        <>
            <Header />
            {isBusy ?
                (<Loader />)
                : (restaurantState.restaurant ?
                    (<Box>
                        <Redirect to='/editor'></Redirect>
                    </Box>
                    ) : (
                        <CreateRestaurant />
                    )
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        restaurantState: state.restaurant,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    restaurantAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);