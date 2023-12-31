import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { MainPage } from './pages/MainPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { MyPostsPage } from "./pages/MyPostsPage.jsx";
import { AddPostPage } from './pages/AddPostPage.jsx';
import { PostPage } from "./pages/PostPage.jsx";
import { EditPostPage } from './pages/EditPostPage.jsx';
import { UserPostsPage } from './pages/UserPostsPage.jsx';
import { EditUserDescription } from "./pages/EditUserDescription.jsx";

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
            path: 'user/:idUser/posts',
            element: <UserPostsPage/>
         },
         {
            path: 'new',
            element: <AddPostPage/>
         },
         {
            path: ':id',
            element: <PostPage/>
         },
         {
            path: ':id/edit',
            element: <EditPostPage/>
         },
         {
            path: ':id/edit/description',
            element: <EditUserDescription/>
         }
      ],
   }
]);