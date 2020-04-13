
const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BASIC':
            console.log('ADD_BASIC', action )
            return {...state, ...action.payload};
        case 'SET_CHANNELS':
            const newState = {...state, ...action.payload};
            return newState;
        case 'UPDATE_TS':
            const newState2 = {...state, ...action.payload, ts: Date.now()};
            return newState2;

        default:
            return state;
    }
};

export default basicReducer;
