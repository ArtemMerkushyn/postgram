import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const EditUserDescription = () => {
  return (
    <form className='description-posts' onSubmit={e => e.preventDefault()}>
        <label className='description-posts__item'>
            <div>Придумай описання для своєї сторінки</div>
            <TextareaAutosize
               spellCheck={false}
               placeholder='Описання твоєї сторінки'
            />
        </label>
    </form>
  )
}
