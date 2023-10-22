const initialState = {
  posts: [],
  post: null,
  error: null,
  creating: false,
  updating: false,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.payload,
        error: null,
      };

    case 'GET_POSTS_FAILURE':
      return {
        ...state,
        posts: [],
        error: action.payload,
      };

    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        creating: false,
        error: null,
      };

    case 'CREATE_POST_FAILURE':
      return {
        ...state,
        creating: false,
        error: action.payload,
      };

    case 'UPDATE_POST_STATUS_SUCCESS':
      return {
        ...state,
        updating: false,
        error: null,
      };

    case 'UPDATE_POST_STATUS_FAILURE':
      return {
        ...state,
        updating: false,
        error: action.payload,
      };

    case 'FETCH_POST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_POST_SUCCESS':
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_POST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
