
const plottingsReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_PLOTTINGS':
            console.log('PLOT_ ADD_PLOTTINGS', action )
            return {...state, ...action.payload.plottings}
        default:
            return state;
    }
};

export default plottingsReducer;
