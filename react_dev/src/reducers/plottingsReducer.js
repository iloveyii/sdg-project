
const plottingsReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_PLOTTINGS':
            console.log('ADD_PLOTTINGS', action )
            return {...state, ...action.payload.plottings}
        default:
            return state;
    }
};

export default plottingsReducer;
