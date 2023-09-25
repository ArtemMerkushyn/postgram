import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import axios from '../utils/axios.js';
import { updatePost } from '../redux/features/post/postSlice.js';

export const EditPostPage = () => {
   const [imgUrl, setImgUrl] = useState('');
   const [title, setTitle] = useState('');
   const [text, setText] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setImgUrl(data.imgUrl);
   }, [params.id]);

   /*
   const submitHandler = async () => {
      try {
            const updatedPost  = { id: params.id, imgUrl, title, text }
            const res = await axios.put(`/posts/${params.id}`, updatedPost);

            setImgUrl(updatedPost.imgUrl);
            setTitle(updatedPost.title);
            setText(updatedPost.text);
      } catch (error) {
          console.log(error);
      }
  }*/

   const submitHandler = async () => {
      try {
         const updatedData  = { id: params.id, imgUrl, title, text };
         await dispatch(updatePost({ id: params.id, updatedPost: updatedData }));
         navigate('/');
      } catch (error) {
         console.log(error);
      }
   }

   const clearFormHandler = () => {
      setImgUrl('');
      setTitle('');
      setText('');
   }

   useEffect(() => {
      fetchPost();
   }, [fetchPost]);

   return (
      <form
         className='add-post'
         onSubmit={e => e.preventDefault()}
      >
         
         <label className='add-post__item'>
            <div>Встав новий url-картинки</div>
            <input 
               type="text" 
               value={imgUrl}
               onChange={(e) => setImgUrl(e.target.value)}
               placeholder='url-картинки'
            />
         </label>
         <div className='add-post__item'>
            {imgUrl && (
               <img className='add-post__item-img' src={imgUrl} alt='img' />
            )}
         </div>
         <label className='add-post__item'>
            <div>Напиши заголовок посту</div>
            <input 
               type="text" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder='Заголовок'
            />
         </label>
         <label className='add-post__item'>
            <div>Придумай текст до свого посту</div>
            <TextareaAutosize
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder='Текст посту'
            />
         </label>
         <div className='post__btns'>
            <button
               className='btn-ok'
               onClick={submitHandler}
            >
               Оновити
            </button>

            <button
               className='btn-cancel'
               onClick={clearFormHandler}
            >
               Відмінити
            </button>
         </div>
      </form>
   );
}
