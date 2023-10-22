import axios from 'axios';

export const getPostsSuccess = (posts) => ({
  type: 'GET_POSTS_SUCCESS',
  payload: posts,
});

export const getPostsFailure = (error) => ({
  type: 'GET_POSTS_FAILURE',
  payload: error,
});

export const createPostSuccess = (post) => ({
  type: 'CREATE_POST_SUCCESS',
  payload: post,
});

export const createPostFailure = (error) => ({
  type: 'CREATE_POST_FAILURE',
  payload: error,
});

export const updatePostStatusSuccess = (message) => ({
  type: 'UPDATE_POST_STATUS_SUCCESS',
  payload: message,
});

export const updatePostStatusFailure = (error) => ({
  type: 'UPDATE_POST_STATUS_FAILURE',
  payload: error,
});

export const getPosts = () => {
  return async (dispatch) => {
    axios
      .get('http://localhost:3000/api/posts')
      .then((response) => {
        dispatch(getPostsSuccess(response.data));
      })
      .catch((err) => {
        console.log('Error:', err);
        dispatch(getPostsFailure(err.response.data.error));
      });
  }
}

export const postCreate = (postData, navigate) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3000/api/posts/create', postData)
      .then((response) => {
        console.log('Registration Success:', response.data);
        dispatch(createPostSuccess(response.data));
        navigate('/post');
      })
      .catch((err) => {
        console.log('Registration Error:', err);
        dispatch(createPostFailure(err.response.data.error));
      });
  };
};

export const updatePostStatus = (id, currentStatus) => {
  return async (dispatch) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    axios
      .put(`http://localhost:3000/api/posts/${id}/status`, { status: newStatus })
      .then((response) => {
        dispatch(updatePostStatusSuccess(response.data.message));
      })
      .catch((err) => {
        console.log('Error:', err);
        dispatch(updatePostStatusFailure(err.response.data.error));
      })
  }
};


export const fetchPostRequest = () => ({
  type: 'FETCH_POST_REQUEST',
});

export const fetchPostSuccess = (post) => ({
  type: 'FETCH_POST_SUCCESS',
  payload: post,
});

export const fetchPostFailure = (error) => ({
  type: 'FETCH_POST_FAILURE',
  payload: error,
});

export const fetchPostById = (id) => {
  return async (dispatch) => {
    dispatch(fetchPostRequest());

    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${id}`);

      if (response.status === 200) {
        dispatch(fetchPostSuccess(response.data));
      } else {
        console.log('Failed to fetch post:', response.status);
        dispatch(fetchPostFailure('Failed to fetch post'));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      dispatch(fetchPostFailure('Failed to fetch post'));
    }
  };
};
