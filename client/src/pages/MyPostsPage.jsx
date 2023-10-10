import React, { useEffect, useState } from 'react';
import axios from '../utils/axios.js';
import { UserPostsItem } from '../components/UserPostsItem.jsx';
import { useSelector } from 'react-redux';

export const MyPostsPage = () => {
   const [ posts, setPosts ] = useState([]);
   const user = useSelector((state) => state.auth.user);

   const fetchMyPosts = async () => {
      try {
         const { data } = await axios.get('/posts/user/me');
         // сортую пости по часу створення в зворотньому порядку
         const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         setPosts(sortedPosts);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchMyPosts();
   }, []);
   
   return (
      <div className='my-posts'>
         {user ? (
            <div className="my-posts__info">
               <div className="my-posts__info-item">{user.username}</div>
               <div className="my-posts__info-item">Кількість постів: {posts.length}</div>
            </div>
            ) : (
               <p>Loading user data...</p>
            )
         }
         {posts?.map((post, idx) => {
            return <UserPostsItem post={post} key={idx}/>
            
         })}
      </div>
   );
}