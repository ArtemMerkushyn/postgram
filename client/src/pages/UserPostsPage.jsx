import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { UserPostsItem } from '../components/UserPostsItem.jsx';

export const UserPostsPage = () => {
  const [ posts, setPosts ] = useState([]);
  const [ userInfo, setUserInfo ] = useState(null);
  const { idUser } = useParams();
/*
  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/${idUser}/posts`);
      setPosts(data.list);
      setUserInfo(data.user);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
 }, [idUser, fetchUserPosts]);
*/
const fetchUserPosts = useCallback(async () => {
  try {
    const { data } = await axios.get(`/posts/${idUser}/posts`);
    setPosts(data.list);
    setUserInfo(data.user);
  } catch (error) {
    console.log(error);
  }
}, [idUser]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserPosts();
    };

    fetchData();
  }, [fetchUserPosts]);

  return (
    <div className='user-posts'>
      {userInfo ? (
        <div className="my-posts__info">
           <div className="my-posts__info-item">{ userInfo.username }</div>
           <div className="my-posts__info-item">Кількість постів: { userInfo.posts.length }</div>
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