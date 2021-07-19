import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../layout/Header";
import { CreateRestaurant } from './../restaurant/Create';
import RestaurantService from "../../services/RestaurantService";
import Loader from './../layout/Loader';
import { useDispatch, useSelector } from "react-redux";
import restaurantAction from "../../states/actions/restaurantAction";
export const Home = () => {
    const restaurant = useSelector(state => state.restaurant);
    const dispatch = useDispatch();
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        RestaurantService.fetchMyRestaurant().then(response => {
            dispatch(restaurantAction(response.data));
            setBusy(false);
        });
    }, []);
    return (
        <>
            {isBusy ?
                (<Loader />)
                : (restaurant ?
                    (
                        <Header />
                    ) : (
                        <CreateRestaurant />
                    )
                )
            }
        </>
    )
}
