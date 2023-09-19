import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';
import { PostsItem } from '../components/PostsItem';

export const MainPage = () => {
   const dispatch = useDispatch();
   const { posts, popularPosts } = useSelector((state) => state.post);

   console.log(posts)
   useEffect(() => {
      dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
      return (
          <div className='text-xl text-center text-white py-10'>
              Постів немає.
          </div>
      )
  }
   return (
      <div className='main-page'>
            <div className="main-page__posts">
                {posts?.map((post, idx) => (
                    <PostsItem key={idx} post={post}/>
                ))}
            </div>
        </div>
   );
}
