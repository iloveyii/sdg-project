
const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BASIC':
            console.log('ADD_BASIC', action );
            const newState1 = {...state, ...action.payload};
            if(Array.isArray(newState1.channels)) {
                const current_channels = {channel1: newState1.channels[0], channel2: newState1.channels[1]};
                newState1.current_channels = current_channels;
            }
            return newState1;
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
