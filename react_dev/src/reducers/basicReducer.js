
const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BASIC':
            console.log('ADD_BASIC', action )
            return {...state, ...action.payload};
        case 'SET_CHANNELS':
            const newState = {...state, ...action.payload};
            return newState;
        default:
            return state;
    }
};

export default basicReducer;
