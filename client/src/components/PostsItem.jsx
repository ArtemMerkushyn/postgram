import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'

export const PostsItem = ({ post }) => {
  return (
    <div className='post-item'>
      <div className="post-item__img">
        {post.imgUrl ? (
          <img src={post.imgUrl} alt="img"/>
        ) : null}
      </div>
      <div className="post-item__info">
        <div className="post-item__username">
          {post.username}
        </div>
        <div className="post-item__date">
          <Moment date={post.createdAt} format='D MMM YYYY'/>
        </div>
      </div>
      <div className="post-item__title">{post.title}</div>
      <div className="post-item__text">{post.text}</div>
      <div className='post-item__counter'>
        <button className='post-item__counter-btn'>
          <AiFillEye/><span>{post.views}</span>
        </button>
        <button className='post-item__counter-btn'>
          <AiOutlineMessage />{' '}
          <span>{post.comments?.length || 0} </span>
        </button>
      </div>
    </div>
  )
}
