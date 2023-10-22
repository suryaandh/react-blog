import axios from 'axios';


export const createPost = (postData) => {
  return {
    type: 'CREATE_POST',
    payload: postData,
  }
}

export const postCreate = (postData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3000/api/posts/create', postData);

      if (response.status === 200) {
        dispatch(createPost(response.data));
        navigate('/');
      } else {
        console.log('Error creating post');
      }
    } catch (error) {
      console.log('Error creating post', error);
    }
  }
}