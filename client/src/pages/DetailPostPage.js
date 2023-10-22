import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

const DetailPostPage = () => {
  // State untuk menyimpan data posting
  const [post, setPost] = useState(null);
  const { id } = useParams();

  // Gunakan useEffect untuk memanggil API saat komponen dimuat
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error('Failed to fetch post:', response.status);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <time>Published on: {formatISO9075(new Date(post.createdAt))}</time>
          <div className='author'>Author: {post.author}</div>
          <div className='image'>
            <img src={post.image} alt={post.title} />
          </div>
          <div className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPostPage;
