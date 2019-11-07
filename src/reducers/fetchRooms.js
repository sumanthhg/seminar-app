export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ROOMS':
            return action.payload;
        case 'CREATE_ROOM':
            debugger
            return [...state, action.payload];
        case 'FETCH_ROOM':
            return action.payload;
        default:
            return state;
    }
}