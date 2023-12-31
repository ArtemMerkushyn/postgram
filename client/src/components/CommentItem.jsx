import React from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import Moment from 'react-moment';

export const CommentItem = ({ cmt }) => {
  return (
    <div className='comment'>
      <div className="comment__item">
        <div className="comment__item-info">
          <Link to={`/user/${cmt.author}/posts`}>
          <div className="comment__item-info--username">{cmt.username}</div>
          </Link>
          <span className='comment__item-info--separate'></span>
          <div className="comment__item-info--date">
            <Moment date={cmt.createdAt} format='DD.MM.YY HH:mm'/>
          </div>
        </div>
        <div className="comment__item-text">
          <TextareaAutosize disabled spellCheck={false} value={cmt.comment} />
        </div>
      </div>
    </div>
  );
}