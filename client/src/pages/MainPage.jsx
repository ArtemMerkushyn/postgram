import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';
import { PostsItem } from '../components/PostsItem';

export const MainPage = () => {
    const [sortBy, setSortBy] = useState('date'); // По умолчанию сортируем по дате
    const dispatch = useDispatch();
    const { posts, popularPosts } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const sortedPosts = sortBy === 'popular' ? popularPosts : posts;

    const handleChangeSort = (e) => {
        setSortBy(e.target.value);
        console.log(popularPosts)
    };

    if (!sortedPosts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        );
    }

    return (
        <div className='main-page'>
            <div className='sort'>
                <label htmlFor="sortBy">Сортувати по:</label>
                <select id="sortBy" value={sortBy} onChange={handleChangeSort}>
                    <option value="date">Даті</option>
                    <option value="popular">Популярності</option>
                </select>
            </div>

            <div className="main-page__posts">
                {sortedPosts.map((post, idx) => (
                    <PostsItem key={idx} post={post} />
                ))}
            </div>
        </div>
    );
};