import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/features/post/postSlice.js';
import TextareaAutosize from 'react-textarea-autosize';

export const AddPostPage = () => {
   const [ imgUrl, setImgUrl] = useState('');
   const [ title, setTitle] = useState('')
   const [ text, setText] = useState('')

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const submitHandler = () => {
      try {
         dispatch(createPost({ imgUrl, title, text }));
         navigate('/');
         window.location.reload();
      } catch (error) {
         console.log(error);
      }
   }

   const clearFormHandler = () => {
      setImgUrl('');
      setTitle('');
      setText('');
  }

   return (
      <form
         className='add-post'
      >
         <label className='add-post__item'>
            <div>Встав url-картинки</div>
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
               spellCheck={false}
            />
         </label>
         <div className='post__btns'>
            <button
               className='btn-ok'
               onClick={submitHandler}
            >
               Добавити
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
