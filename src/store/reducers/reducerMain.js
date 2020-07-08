import {GET_MAIN} from "../actions/index";

export default function (state = [], action) {
    switch (action.type) {
        case GET_MAIN:
            return {
                ...state,
                soloTiers: action.data.soloTiers,
                duoTiers: action.data.duoTiers,
            }
        default:
            return state;
    }
}