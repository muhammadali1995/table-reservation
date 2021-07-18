export default (state, action) => {
    switch (action.type) {
        case 'user':
            return {
                user: action.payload
            }
        default:
            return state;
    }
}