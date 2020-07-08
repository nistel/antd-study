import {
    ADD_POSTING,
    UPDATE_POSTING,
    DELETE_POSTING
} from "../actions"

const initialState = [{
    id: 1,
    title: ' This is First Post',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
}]

const posts = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POSTING:
            return state.concat(action.post);
        case DELETE_POSTING:
            return state.filter(post => post.id !== action.id);
        case UPDATE_POSTING:
            const filtered = state.filter((post) => post.id !== action.post.id);
            return [...filtered, action.post];
        default:
            return state;
    }
};

export default posts;

// // find the id which are trying to update with new title and description
// const filtered = state.map((post) => post.id === action.payload.id);
// filtered.title = action.payload.title;
// filtered.description = action.payload.description;
// return filtered; //according your need post this


// post => post.id === action.id ? {
//     ...action.post,
// } :
// post

// return state.map(post => {
//     if(post.id === action.id){
//        return {
//            ...post,
//            ...action.title,
//            ...action.description
//        }

//     } else {
//         return post
//     }
//   }
//  )