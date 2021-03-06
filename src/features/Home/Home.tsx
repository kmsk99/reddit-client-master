import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedList } from 'react-animated-list';
import Post from '../Post/Post';
import PostLoading from '../Post/PostLoading';
import getRandomNumber from '../../utils/getRandomNumber';
import {
    fetchPosts,
    selectFilteredPosts,
    setSearchTerm,
    fetchComments,
    selectReddit,
} from '../../store/redditSlice';

const Home = () => {
    const reddit = useSelector(selectReddit);
    const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
    const posts = useSelector(selectFilteredPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
    }, [dispatch, selectedSubreddit]);

    const onToggleComments = (index: number) => {
        const getComments = (permalink: string) => {
            dispatch(fetchComments(index, permalink));
        };

        return getComments;
    };

    if (isLoading) {
        return (
            <AnimatedList animation="zoom">
                {Array(getRandomNumber(3, 10)).fill(<PostLoading />)}
            </AnimatedList>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h2>Failed to load posts.</h2>
                <button
                    type="button"
                    className="py-4 text-base text-white bg-indigo-600 rounded cursor-pointer px-9"
                    onClick={() => dispatch(fetchPosts(selectedSubreddit))}
                >
                    Try again
                </button>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h2>No posts matching "{searchTerm}"</h2>
                <button
                    type="button"
                    className="py-4 text-base text-white bg-indigo-600 rounded cursor-pointer px-9"
                    onClick={() => dispatch(setSearchTerm(''))}
                >
                    Go home
                </button>
            </div>
        );
    }

    return (
        <>
            {posts.map((post, index) => (
                <Post
                    key={post.id}
                    post={post}
                    onToggleComments={onToggleComments(index)}
                />
            ))}
        </>
    );
};

export default Home;
