import { combineReducers } from 'redux';
import mainReducer from './reducerMain'

const rootReducer = combineReducers({
    main: mainReducer
});

export default rootReducer;