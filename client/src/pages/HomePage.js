import React, { useEffect } from 'react';
import Post from '../components/Post';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {posts
        .filter((post) => post.status === 1)
        .map((post) => (
          <Link key={post.id} className="content-post" to={`/posts/${post.id}`}>
            <Post
              title={post.title}
              author={post.author}
              time={post.updatedAt}
              summary={post.summary}
              image={post.image}
            />
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
