import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { BiUserPin, BiMessageAltAdd, BiLogOut, BiLogIn } from "react-icons/bi";

export const NavBar = () => {
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logoutHandler = () => {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
      toast('Ви успішно вийшли');
   }

   /*const activeStyles = {
      color: 'orange',
   }*/
   const refreshHandler = () => {
      navigate('/');
      window.location.reload();
   }

   return (
      <div className='navbar'>
         <Link to={'/'} onClick={refreshHandler}>
            <div className="navbar__logo">Postgram</div>
         </Link>
         {isAuth && (
            <div className="navbar__item">
               <NavLink 
                  to={'posts'}
                  //style={({ isActive }) => isActive ? activeStyles : undefined}
               >
                  <BiUserPin/>
                  <span>Мої пости</span>
               </NavLink>
               <NavLink 
                  to={'new'}
                  //style={({ isActive }) => isActive ? activeStyles : undefined}
               >
                  <BiMessageAltAdd/>
                  <span>Добавити пост</span>
               </NavLink>
            </div>
         )}
         <div className="navbar__item">
            {isAuth ? (
                  <button className='navbar__btn' onClick={logoutHandler}>
                     <BiLogOut/>
                     <span>Вийти</span>
                  </button>
               ) : (
                  <NavLink 
                     to={'/login'}
                     //style={({ isActive }) => isActive ? activeStyles : undefined}
                  >
                     <BiLogIn/>
                     <span>Увійти</span>
                  </NavLink>
               )
            }
         </div>
      </div>   
   );
}
