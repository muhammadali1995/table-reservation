import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../layout/Header";
import { CreateRestaurant } from './../restaurant/Create';
import RestaurantService from "../../services/RestaurantService";
import Loader from './../layout/Loader';
export const Home = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        RestaurantService.fetchMyRestaurant().then(response => {
            setRestaurant(response.data);
            setBusy(false);
        })
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
