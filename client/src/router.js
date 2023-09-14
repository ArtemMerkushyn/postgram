import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { MainPage } from './pages/MainPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { MyPostsPage } from "./pages/MyPostsPage.jsx";
import { AddPostPage } from './pages/AddPostPage.jsx';

export const router = createBrowserRouter([
   {
      path: '/',
      element: <App/>,
      children: [
         {
            index: true,
            element: <MainPage/>
         },
         {
            path: 'register',
            element: <RegisterPage/>
         },
         {
            path: 'login',
            element: <LoginPage/>
         },
         {
            path: 'posts',
            element: <MyPostsPage/>
         },
         {
            path: 'new',
            element: <AddPostPage/>
         },
      ],
   }
]);