import { combineReducers } from 'redux';
import mainReducer from './reducerMain'
import academyReducer from './reducerAcademyPlayers'

const rootReducer = combineReducers({
    main: mainReducer,
    academyPlayer: academyReducer
});

export default rootReducer;