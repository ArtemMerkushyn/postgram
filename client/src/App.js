import { Outlet } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice.js';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getMe());
   }, [dispatch]);

   return (
      <div className="App">
         <div className="container">
            <NavBar/>
            <Outlet/>
            <ToastContainer position='top-right'/>
         </div>
      </div>
   );
}

export default App;
