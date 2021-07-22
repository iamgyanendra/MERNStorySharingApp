import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionType';

import * as api from '../api/index.js';

//action creators are fun that return action
//redux thunk for async

// const getPost = ()=>{
//     const action = {type: 'FETCH_ALL', payload: []}

//     return action;
// }
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
      dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch)=>{ 
    try {
        const { data } = await api.createPost(post);
        history.push(`/post/${data._id}`);
        dispatch({type:CREATE, payload:data})
        
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch)=>{
     try {
         const {data} = await api.updatePost(id, post);

         dispatch({type: UPDATE, payload: data})
     } catch (error) {
         console.log(error);
     }

}

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const likePost= (id) =>async(dispatch) => {
      try {
            const {data} = await api.likePost(id);

            dispatch({type: LIKE, payload: data})
      } catch (error) {
          console.log(error);
      }
  }

