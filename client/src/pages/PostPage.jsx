import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, } from 'react-icons/ai';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { removePost } from '../redux/features/post/postSlice.js';
import { toast } from 'react-toastify';

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const removePostHandler = () => {
      try {
        dispatch(removePost(params.id));
        toast('Пост був успішно видалений.');
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);
    
    useEffect(() => {
      fetchPost();
    }, [fetchPost]);

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
   
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
          <div className="post-item__text">
            <TextareaAutosize
              value={post.text}
            />
          </div> 
          <div className="post-item__wrapper">
            <div className='post-item__counter'>
              <button className='post-item__counter-btn'>
                <AiFillEye/><span>{post.views}</span>
              </button>
              <button className='post-item__counter-btn'>
                <AiOutlineMessage />{' '}
                <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            {user?._id === post.author &&(
              <div className="post-item__control">
                <button>
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className='flex items-center justify-center gap-2  text-white opacity-50'
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
    );
}

