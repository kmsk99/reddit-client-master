import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
    TiArrowUpOutline,
    TiArrowUpThick,
    TiArrowDownOutline,
    TiArrowDownThick,
    TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';
import Card from '../../components/Card/Card';
import Comment from '../Comment/Comment';
import Avatar from '../Avatar/Avatar';
import type { RedditPost } from '../../api/reddit';

const Post = (props: {
    post: RedditPost;
    onToggleComments: (permalink: string) => void;
}) => {
    const [voteValue, setVoteValue] = useState(0);

    const { post, onToggleComments } = props;

    /**
     * @param {number} newValue The new vote value
     */
    const onHandleVote = (newValue: number) => {
        if (newValue === voteValue) {
            setVoteValue(0);
        } else if (newValue === 1) {
            setVoteValue(1);
        } else {
            setVoteValue(-1);
        }
    };

    const renderUpVote = () => {
        if (voteValue === 1) {
            return <TiArrowUpThick className="mr-1 text-2xl" />;
        }
        return <TiArrowUpOutline className="mr-1 text-2xl" />;
    };

    const renderDownVote = () => {
        if (voteValue === -1) {
            return <TiArrowDownThick className="mr-1 text-2xl" />;
        }
        return <TiArrowDownOutline className="mr-1 text-2xl" />;
    };

    const getVoteType = () => {
        if (voteValue === 1) {
            return 'up-vote';
        }
        if (voteValue === -1) {
            return 'down-vote';
        }

        return '';
    };

    const renderComments = () => {
        if (post.errorComments) {
            return (
                <div>
                    <h3>Error loading comments</h3>
                </div>
            );
        }

        if (post.loadingComments) {
            return (
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            );
        }

        if (post.showingComments) {
            return (
                <div>
                    {post.comments.map((comment) => (
                        <Comment comment={comment} key={comment.id} />
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <article key={post.id}>
            <Card>
                <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                        <button
                            type="button"
                            className={`cursor-pointer text-gray-600 p-0 flex items-center rounded bg-transparent border-none hover:bg-white hover:text-green-600 ${
                                voteValue === 1 && 'text-green-600'
                            }`}
                            onClick={() => onHandleVote(1)}
                            aria-label="Up vote"
                        >
                            {renderUpVote()}
                        </button>
                        <p
                            className={`font-bold my-2 ${
                                getVoteType() === 'up-vote' && 'text-green-600'
                            } 
                            ${getVoteType() === 'down-vote' && 'text-red-600'}`}
                        >
                            {shortenNumber(post.ups, 1)}
                        </p>
                        <button
                            type="button"
                            className={`cursor-pointer text-gray-600 p-0 flex items-center rounded bg-transparent border-none hover:bg-white hover:text-red-600 ${
                                voteValue === -1 && 'text-red-600'
                            }`}
                            onClick={() => onHandleVote(-1)}
                            aria-label="Down vote"
                        >
                            {renderDownVote()}
                        </button>
                    </div>
                    <div className="w-full">
                        <h3 className="m-0 mb-4 text-gray-800">{post.title}</h3>

                        <div className="w-full overflow-hidden rounded-lg">
                            <img src={post.url} alt="" className="w-full" />
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-4 text-xs border-t border-gray-200 border-solid">
                            <span className="flex items-center">
                                <Avatar name={post.author} />
                                <span className="font-bold text-indigo-600">
                                    {post.author}
                                </span>
                            </span>
                            <span>
                                {moment.unix(post.created_utc).fromNow()}
                            </span>
                            <span className="flex items-center">
                                <button
                                    type="button"
                                    className={`cursor-pointer text-gray-600 p-0 flex items-center rounded bg-transparent border-none hover:bg-white ${
                                        post.showingComments &&
                                        'text-indigo-600'
                                    }`}
                                    onClick={() =>
                                        onToggleComments(post.permalink)
                                    }
                                    aria-label="Show comments"
                                >
                                    <TiMessage className="mr-1 text-2xl" />
                                </button>
                                {shortenNumber(post.num_comments, 1)}
                            </span>
                        </div>

                        {renderComments()}
                    </div>
                </div>
            </Card>
        </article>
    );
};

export default Post;
