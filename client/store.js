import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import { TYPES } from './actions';

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.SET_PRODUCTS :
            return {...action.data};
        case TYPES.ADD_PRODUCT :
            return {...state,
                    ...action.data};
        case TYPES.REMOVE_PRODUCT :
            return {...state};
        default :
            return state;
    };
};

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.NEW_ORDER :
            return {...action.data};
        case TYPES.ADD_TO_ORDER :
            return {...state,
                    ...action.data};
        case TYPES.RM_FROM_ORDER :
            return {...state};
        default :
            return state;
    };
};

const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.SET_CATEGORIES :
            return {...action.data};
        case TYPES.ADD_CATEGORY :
            return {...state,
                    ...action.data};
        case TYPES.REMOVE_CATEGORY :
            return {...state};
        default :
            return state;
    };
};

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.NEW_CART :
            return {...action.data};
        case TYPES.ADD_TO_CART :
            return {...state,
                    ...action.data};
        case TYPES.RM_FROM_CART :
            return {...state};
        default :
            return state;
    };
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES.NEW_USER :
            return {...action.data};
        case TYPES.UPDATE_USER :
            return {...state,
                    ...action.data};
        case TYPES.REMOVE_USER :
            return {...state};
        default :
            return state;
    };
};

const masterReducer = combineReducers({
    cart : cartReducer,
    orders : orderReducer,
    products : productReducer,
    categories : categoryReducer,
    user : userReducer,
});

const store = createStore(masterReducer, applyMiddleware(
    thunks
));

export default store;