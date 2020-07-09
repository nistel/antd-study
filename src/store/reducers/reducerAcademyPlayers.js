import {GET_ACADEMY_PLAYER} from "../actions/index";

export default function (state = [], action) {
    switch (action.type) {
        case GET_ACADEMY_PLAYER:
            return {
                ...state,
                academyPlayers: action.data.academyPlayers,
            }
        default:
            return state;
    }
}