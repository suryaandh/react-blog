import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, updatePostStatus } from '../actions/postActions';
import Post from '../components/Post';

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const [buttonTexts, setButtonTexts] = useState({});

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    dispatch(updatePostStatus(id, newStatus));

    setButtonTexts({
      ...buttonTexts,
      [id]: newStatus === 1 ? 'Draft' : 'Publish',
    });
  };

  return (
    <div>
      <div className="create-post">
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <button className="create-button">Create Post</button>
        </Link>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link className="content-post" to={`/posts/${post.id}`}>
            <Post
              title={post.title}
              author={post.author}
              time={post.updatedAt}
              summary={post.summary}
              image={post.image}
            />
          </Link>
          <div className='status-check'>
            <button onClick={() => handleUpdateStatus(post.id, post.status)}>
              {buttonTexts[post.id] || (post.status === 1 ? 'Draft' : 'Publish')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
