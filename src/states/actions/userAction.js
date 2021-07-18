const userAction = (payload) => {
    return {
        type: 'user',
        payload
    }
}

export default userAction;