
const mlReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_ML':
            console.log('ADD_ML', action )
            return {...state, ...action.payload.ml}
        default:
            return state;
    }
};

export default mlReducer;
