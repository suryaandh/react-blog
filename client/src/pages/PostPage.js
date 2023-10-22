import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { postCreate } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let author = null;

  if (token) {
    console.log('Token:', token);

    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('Decoded Payload:', payload);
      author = payload.name;
    }
  }

  async function createNewPost(e) {
    e.preventDefault();

    if (author) {
      const postData = {
        title: title,
        summary: summary,
        content: content,
        image: image,
        author: author,
      };

      await dispatch(postCreate(postData, navigate));
    } else {
      console.error('User is not logged in or author is not defined.');
    }
  }


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


  return (
    <>
      <div >
        <input
          type='text'
          name='title'
          placeholder={'Title'}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type='text'
          name='summary'
          placeholder={'Summary'}
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />

        <input
          type='url'
          name='image'
          placeholder={'Image'}
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        <ReactQuill value={content}
          onChange={newValue => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button style={{ marginTop: '5px' }} onClick={createNewPost}>Create post</button>
      </div>
    </>
  );
};

export default PostPage;
