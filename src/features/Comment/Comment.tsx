import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Avatar from '../Avatar/Avatar';
import type { RedditComment } from '../../api/reddit';

const Comment = (props: { comment: RedditComment }) => {
    const { comment } = props;
    return (
        <div className="p-4 my-2 transition-shadow ease-in delay-100 bg-white rounded hover:shadow-lg">
            <div className="flex items-center mb-4">
                <Avatar name={comment.author} />
                <p className="font-bold text-indigo-600">{comment.author}</p>
                <p className="ml-auto italic">
                    {moment.unix(comment.created_utc).fromNow()}
                </p>
            </div>
            <ReactMarkdown>{comment.body}</ReactMarkdown>
        </div>
    );
};

export default Comment;
