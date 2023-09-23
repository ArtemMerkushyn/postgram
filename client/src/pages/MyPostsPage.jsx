import React, { useEffect, useState } from 'react';
import { PostsItem } from '../components/PostsItem';
import axios from '../utils/axios.js';

export const MyPostsPage = () => {
   const [ posts, setPosts ] = useState([]);

   const fetchMyPosts = async () => {
      try {
         const { data } = await axios.get('/posts/user/me');
         setPosts(data);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchMyPosts();
   }, []);
   
   return (
      <div className='my-posts'>
         {posts?.map((post, idx) => {
            return <PostsItem post={post} key={idx}/>
         })}
      </div>
   );
}

