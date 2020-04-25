const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BASIC':
            console.log('ADD_BASIC', action);
            const newState1 = {...state, ...action.payload.model.attributes};
            if (Array.isArray(newState1.channels)) {
                newState1.channel1 = newState1.channels[0];
                newState1.channel2 = newState1.channels[1];
                newState1.transformation = 'hlog';
                newState1.bins = 400;
            }
            return newState1;
        case 'SET_CHANNELS':
            const newState = {...state, ...action.payload};
            return newState;

        case 'SET_ATTRIBUTES':
            const newState3 = {...state, ...action.payload.attributes};
            console.log('Inside reducer SET_ATTRIBUTES ', newState3)
            return newState3;

        case 'UPDATE_TS':
            const newState2 = {...state, ...action.payload, ts: Date.now()};
            return newState2;

        default:
            return state;
    }
};

export default basicReducer;
