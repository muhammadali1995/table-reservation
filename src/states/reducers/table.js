const tables = (state = {tables: []}, action) => {
    switch (action.type) {
        case 'tables':
            return {
                tables: action.payload
            }
        default:
            return state;
    }
}

export default tables;