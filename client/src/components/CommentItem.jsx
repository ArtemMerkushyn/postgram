import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const CommentItem = ({ cmt }) => {
  return (
    <div className='comment'>
      <div className="comment__item">
        <div className="comment__item-avatar"></div>
      </div>
      <div className="comment__item">
        <div className="comment__item-username">{cmt.username}</div>
        <div className="comment__item-text">
          <TextareaAutosize disabled spellCheck={false} value={cmt.comment} />
        </div>
      </div>
    </div>
  );
}