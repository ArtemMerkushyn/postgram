import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, AiOutlineSend } from 'react-icons/ai';
import Moment from 'react-moment';
import TextareaAutosize from 'react-textarea-autosize';
import { removePost } from '../redux/features/post/postSlice.js';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice.js';
import { toast } from 'react-toastify';
import { CommentItem } from '../components/CommentItem.jsx';

export const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');

    const { user } = useSelector((state) => state.auth);
    const { comments } = useSelector((state) => state.comment);
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

    const handleSubmit = () => {
      try {
        if(!user) {
          setComment('');
          return toast('Авторизуйтесь, щоб залишити ваш коментар.');
        }
        if(!comment.trim()) {
          return toast('Коментар не може бути пустим.');
        }

        const postId = params.id;
        dispatch(createComment({ postId, comment }));
        setComment('');
        toast('Дякуємо за твою думку.');
      } catch (error) {
        console.log(error);
      }
    }
    
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    const fetchComments = useCallback(async () => {
      try {
        dispatch(getPostComments(params.id));
      } catch (error) {
        console.log(error);
      }
    }, [params.id, dispatch]);
    
    useEffect(() => {
      fetchPost();
    }, [fetchPost]);

    useEffect(() => {
      fetchComments()
    }, [fetchComments]);

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
   
    return (
      <div className="post">
        <div className='post-item mb0'>
          <div className="post-item__img">
            {post.imgUrl ? (
              <img src={post.imgUrl} alt="img"/>
            ) : null}
          </div>
          <div className="post-item__info">
            <Link to={`/user/${post.author}/posts`}>
              <div className="post-item__username">
                {post.username}
              </div>
            </Link>
            <div className="post-item__date">
              <Moment date={post.createdAt} format='DD.MM.YY HH:mm'/>
            </div>
          </div>
          <div className="post-item__title">{post.title}</div>
          <div className="post-item__text">
            <TextareaAutosize
              disabled 
              spellCheck={false}
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
        <div className="post-item">
          <form
            className='comment-form'
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="comment-form__textarea">
              <TextareaAutosize
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ height: '150px' }}
                spellCheck={false}
                placeholder='Залиште ваш коментар'
              />
            </div>
            <button className='comment-form__btn' onClick={handleSubmit}><AiOutlineSend /></button>
          </form>
          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} author={cmt.author}/>
          ))}
        </div>
      </div>
    );
}

