import React from 'react';

export const CommentItem = ({ cmt }) => {
  return (
    <div className='comment'>
      <div className="comment__item">
        <div className="comment__item-avatar"></div>
      </div>
      <div className="comment__item">
        <div className="comment__item-username">{cmt.username}</div>
        <div className="comment__item-text">{cmt.comment}</div>
      </div>
    </div>
  );
}