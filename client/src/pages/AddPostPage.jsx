import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const AddPostPage = () => {
   return (
      <form
         className='add-post'
         onSubmit={(e) => e.preventDefault()}
      >
         <label className='add-post__item'>
            <div>Встав url-картинки</div>
            <input 
               type="text" 
               placeholder='url-картинки'
            />
         </label>
         <label className='add-post__item'>
            <div>Напиши заголовок посту</div>
            <input 
               type="text" 
               placeholder='Заголовок'
            />
         </label>
         <label className='add-post__item'>
            <div>Придумай текст до свого посту</div>
            <TextareaAutosize
               placeholder='Текст посту'
            />
         </label>
         <div className='post__btns'>
            <button
               className='btn-ok'
            >
               Добавити
            </button>

            <button
               className='btn-cancel'
            >
               Відмінити
            </button>
         </div>
      </form>
   );
}
