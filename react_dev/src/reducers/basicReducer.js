
const basicReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BASIC':
            console.log('ADD_BASIC', action )
            return [...state, ...action.payload.basic]
        default:
            return state;
    }
};

export default basicReducer;
