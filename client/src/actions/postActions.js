// postActions.js
import axios from 'axios';

export const getPostsSuccess = (posts) => ({
  type: 'GET_POSTS_SUCCESS',
  payload: posts,
});

export const getPostsFailure = (error) => ({
  type: 'GET_POSTS_FAILURE',
  payload: error,
});

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts');

      if (response.status === 200) {
        dispatch(getPostsSuccess(response.data));
      } else {
        console.log('Error fetching posts');
        dispatch(getPostsFailure('Error fetching posts'));
      }
    } catch (error) {
      console.log('Error:', error);
      dispatch(getPostsFailure(error.response.data.error));
    }
  };
};



export const createPostSuccess = (post) => ({
  type: 'CREATE_POST_SUCCESS',
  payload: post,
});

export const createPostFailure = (error) => ({
  type: 'CREATE_POST_FAILURE',
  payload: error,
});

export const postCreate = (postData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3000/api/posts/create', postData);

      if (response.status === 201) {
        dispatch(createPostSuccess(response.data));
      } else {
        console.log('Error creating post');
        dispatch(createPostFailure('Error creating post'));
      }
    } catch (error) {
      console.log('Error:', error);
      dispatch(createPostFailure(error.response.data.error));
    }
  };
};

export const updatePostStatusSuccess = (message) => ({
  type: 'UPDATE_POST_STATUS_SUCCESS',
  payload: message,
});

export const updatePostStatusFailure = (error) => ({
  type: 'UPDATE_POST_STATUS_FAILURE',
  payload: error,
});


export const updatePostStatus = (id, currentStatus) => {
  return async (dispatch) => {
    try {
      // Calculate the new status as the inverse of the current status
      const newStatus = currentStatus === 0 ? 1 : 0;

      const response = await axios.put(`http://localhost:3000/api/posts/${id}/status`, { status: newStatus });

      if (response.status === 200) {
        dispatch(updatePostStatusSuccess(response.data.message));
      } else {
        console.log('Error updating post status');
        dispatch(updatePostStatusFailure('Error updating post status'));
      }
    } catch (error) {
      console.log('Error:', error);
      dispatch(updatePostStatusFailure(error.response.data.error));
    }
  };
};
