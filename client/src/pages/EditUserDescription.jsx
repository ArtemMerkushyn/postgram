import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import TextareaAutosize from 'react-textarea-autosize';
import { updateUser } from '../redux/features/auth/authSlice.js';

export const EditUserDescription = () => {
  const [ description, setDescription ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchDescription = async () => {
    const { data } = await axios.get(`/auth/me`);
    setDescription(data.user.description);
  };

  /*const submitHandler = async () => {
    try {
      const res = await axios.put(`/auth/${params.id}`, { description });
      setDescription(description);
      navigate('/posts');
    } catch (error) {
       console.log(error);
    }
  }*/

  const submitHandler = async () => {
    try {
      const updatedData = { id: params.id, description }
      dispatch(updateUser({ id: params.id, updatedUser: updatedData }));
      navigate('/posts');
    } catch (error) {
       console.log(error);
    }
  }

  const clearFormHandler = () => {
    setDescription('');
  }

  useEffect(() => {
    fetchDescription();
  }, []);

  return (
    <form className='description-posts' onSubmit={e => e.preventDefault()}>
        <label className='description-posts__item'>
            <div>Придумай описання для своєї сторінки</div>
            <TextareaAutosize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              spellCheck={false}
              placeholder='Описання твоєї сторінки'
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
  )
}