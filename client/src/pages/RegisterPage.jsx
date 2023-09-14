import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
   const [ username, setUsername ] = useState('');
   const [ password, setPassword ] = useState('');
   const { status } = useSelector((state) => state.auth);
   const isAuth = useSelector(checkIsAuth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if(status) toast(status);
      if(isAuth) navigate('/');
   }, [status])

   const handleSubmit = () => {
      try {
         dispatch(registerUser({ username, password }));
         setUsername('');
         setPassword('');
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <form className='form-auth' onSubmit={e => e.preventDefault()}>
         <h3 className='form-auth__title'>Реєстрація</h3>
         <label className='form-auth__item'>
            <input 
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder='Username'
               className='form-auth__input'
            />
         </label>
         <label className='form-auth__item'>
            <input 
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder='Password'
               className='form-auth__input'
            />
         </label>
         <div className="form-auth__submit">
            <button 
               className='btn-1' 
               onClick={handleSubmit}
            >
               Зареєструвати
            </button>
            <Link to={'/login'}>У мене вже є акаунт</Link>
         </div>
      </form>
   );
}
