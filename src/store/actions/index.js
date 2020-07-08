// 액션 타입 정의
export const ADD_POSTING = 'ADD_POSTING';
export const DELETE_POSTING = 'DELETE_POSTING';
export const UPDATE_POSTING = 'UPDATE_POSTING';

let nextId = 2;

// 액션 생성 함수
export const addPosting = (title, description) => {
    return {
        type: ADD_POSTING,
        post: {
            id: nextId++,
            title,
            description
        }
    };
}

export const updatePosting = (id, title, description) => {
    return {
        type: UPDATE_POSTING,
        post: {
            id: id,
            title,
            description
        }
    }
}

export const deletePosting = (id) => {
    return {
        type: DELETE_POSTING,
        id
    }
}

// export const updatePosting = (post) => {
//     return {
//         type: UPDATE_POSTING,
//         payload: {
//         title: post.title,
//         description: post.description
//         }
//     }
// }