import axios from 'axios';
// 액션 타입 정의
export const GET_ACADEMY_PLAYER = 'GET_ACADEMY_PLAYER';
export const ADD_ACADEMY_PLAYER = 'ADD_ACADEMY_PLAYER';
export const DELETE_ACADEMY_PLAYER = 'DELETE_ACADEMY_PLAYER';
export const GET_MAIN = 'GET_MAIN';

const BASE_URL = `https://testapi.log.gg/api/v1`

export const getMainData = (data) => {
    return {
        type: GET_MAIN,
        data
    }
}

export const getMains = () => {
    return (dispatch) => {
        return axios.get(`${BASE_URL}/main`)
            .then(response => {
                // console.log(response.data)
                dispatch(getMainData(response.data.items))
            })
            .catch(error => {
                throw(error);
            });
    }
}