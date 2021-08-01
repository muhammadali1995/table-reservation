const reservations = (state = { reservations: [] }, action) => {
    switch (action.type) {
        case 'reservations':
            return {
                reservations: action.payload
            }
        default:
            return state;
    }
}

export default reservations;