import React from 'react';

export const CommentItem = () => {
  return (
    <div className='comment'>
      <div className="comment__item">
        <div className="comment__item-avatar"></div>
      </div>
      <div className="comment__item">
        <div className="comment__item-username">Username</div>
        <div className="comment__item-text"></div>
      </div>
    </div>
  );
}