import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { fetchSubreddits, selectSubreddits } from '../../store/subRedditSlice';
import {
    setSelectedSubreddit,
    selectSelectedSubreddit,
} from '../../store/redditSlice';

const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    return (
        <Card className="pr-4 hover:bg-newtransparent-white">
            <h2 className="mt-0 text-gray-800">Subreddits</h2>
            <ul className="p-0 list-none">
                {subreddits.map((subreddit) => (
                    <li
                        key={subreddit.id}
                        className={` ${
                            selectedSubreddit === subreddit.url &&
                            `bg-newtransparent-blue border-l-4 border-solid border-indigo-900`
                        }`}
                    >
                        <button
                            type="button"
                            className={`flex items-center w-full p-4 font-semibold text-gray-600 bg-transparent border-none rounded cursor-pointer hover:bg-white ${
                                selectedSubreddit === subreddit.url &&
                                ` text-indigo-600`
                            }`}
                            onClick={() =>
                                dispatch(setSelectedSubreddit(subreddit.url))
                            }
                        >
                            <img
                                src={
                                    subreddit.icon_img ||
                                    `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                                }
                                alt={`${subreddit.display_name}`}
                                className="w-6 h-6 mr-2 rounded-full"
                                style={{
                                    border: `3px solid ${subreddit.primary_color}`,
                                }}
                            />
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default Subreddits;
