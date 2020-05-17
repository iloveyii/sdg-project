const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_CHANNELS':
            if (Array.isArray(action.payload.channels)) {
                state.channels = action.payload.channels;
                state.ts = Date.now();
                console.log('Basic_ ADD_CHANNELS', state, action);
            }
            return state;

        case 'SET_ATTRIBUTES':
            state.attributes = action.payload.attributes;
            console.log('Inside reducer SET_ATTRIBUTES ', action);
            return state;

        case 'UPDATE_TS':
            const newState2 = {...state, ...action.payload, ts: Date.now()};
            return newState2;

        default:
            return state;
    }
};

export default basicReducer;
