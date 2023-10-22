import React from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({ title, author, time, summary, image }) => {
  return (
    <div className="post">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <Link to={'/'} className="author">{author}</Link>
          <time>{formatISO9075(new Date(time), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
