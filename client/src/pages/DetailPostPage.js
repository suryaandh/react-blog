import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../actions/postActions';
import { formatISO9075 } from 'date-fns';

const DetailPostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <time>Published on: {formatISO9075(new Date(post.createdAt))}</time>
          <div className="author">Author: {post.author}</div>
          <div className="image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default DetailPostPage;
