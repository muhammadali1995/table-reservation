const user = (state = {user: null}, action) => {
    switch (action.type) {
        case 'user':
            return {
                user: action.payload
            }
        default:
            return state;
    }
}



export default user;