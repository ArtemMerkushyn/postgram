import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice.js';

export const LoginPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { status } = useSelector((state) => state.auth);
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if(status) toast(status);
      if(isAuth) navigate('/');
   }, [status, navigate]);

   const handleSubmit = () => {
      try {
         dispatch(loginUser({ username, password }));
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <form className='form-auth' onSubmit={e => e.preventDefault()}>
         <h3 className='form-auth__title'>Авторизація</h3>
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
            <button className='btn-1' onClick={handleSubmit}>Увійти</button>
            <Link to={'/register'}>У мене немає акаунту</Link>
         </div>
      </form>
   );
}
