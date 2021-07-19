const restaurant = (state = {restaurant: null}, action) => {
    switch (action.type) {
        case 'restaurant':
            return {
                restaurant: action.payload
            }
        default:
            return state;
    }
}

export default restaurant;