import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { UserPostsItem } from '../components/UserPostsItem.jsx';

export const UserPostsPage = () => {
  const [ posts, setPosts ] = useState([]);
  const { idUser } = useParams();

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/${idUser}/posts`);
      setPosts(data.list);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
 }, []);

  return (
    <div className='user-posts'>
      {posts?.map((post, idx) => {
        return <UserPostsItem post={post} key={idx}/>
      })}
    </div>
  );
}

