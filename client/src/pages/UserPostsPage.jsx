import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios.js';
import { UserPostsItem } from '../components/UserPostsItem.jsx';

export const UserPostsPage = () => {
  const [ userInfo, setUserInfo ] = useState(null);
  const [ posts, setPosts ] = useState([]);
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
    setUserInfo(data.user);

    const sortedPosts = data.list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(sortedPosts);
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
          <div className="my-posts__info-item no-hover">{ userInfo.username }</div>
          <div className="my-posts__info-item">Кількість постів: { userInfo.posts.length }</div>
          <div className="my-posts__info-item">
            {userInfo.description ? (
                <div className='my-posts__info-item--description'>{userInfo.description}</div>
              ) : (
              <div className='my-posts__info-item--description'>
                  Інформація про сторінку користувача відсутня.
              </div>
            )}
          </div>
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