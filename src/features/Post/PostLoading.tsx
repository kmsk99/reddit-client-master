import Skeleton from 'react-loading-skeleton';
import {
    TiArrowUpOutline,
    TiArrowDownOutline,
    TiMessage,
} from 'react-icons/ti';
import getRandomNumber from '../../utils/getRandomNumber';

const PostLoading = () => {
    return (
        <article className="flex p-6 mb-8 text-gray-600 transition-shadow ease-in delay-100 bg-white rounded">
            <div className="flex flex-col items-center mr-6">
                <button
                    type="button"
                    className="flex items-center p-0 text-gray-600 bg-transparent border-none rounded cursor-pointer hover:bg-white hover:text-green-600"
                    aria-label="Up vote"
                >
                    <TiArrowUpOutline className="mr-1 text-2xl" />
                </button>
                <Skeleton className="w-2 post-votes-value" />
                <button
                    type="button"
                    className="flex items-center p-0 text-gray-600 bg-transparent border-none rounded cursor-pointer hover:bg-white hover:text-red-600"
                    aria-label="Down vote"
                >
                    <TiArrowDownOutline className="mr-1 text-2xl" />
                </button>
            </div>
            <div className="w-full">
                <h3 className="m-0 mb-4 text-gray-800">
                    <Skeleton width={getRandomNumber(100, 200)} />
                </h3>

                <div className="w-full overflow-hidden rounded-lg">
                    <Skeleton height={250} />
                </div>

                <div className="flex items-center justify-between pt-2 mt-4 text-xs">
                    <span>
                        <Skeleton width={getRandomNumber(20, 50)} />
                    </span>
                    <span>
                        <Skeleton width={getRandomNumber(50, 100)} />
                    </span>
                    <span className="flex items-center">
                        <button
                            type="button"
                            className="flex items-center p-0 text-gray-600 bg-transparent border-none rounded cursor-pointer hover:bg-white"
                            aria-label="Show comments"
                        >
                            <TiMessage className="mr-1 text-2xl" />
                        </button>
                        <Skeleton width={getRandomNumber(10, 50)} />
                    </span>
                </div>
            </div>
        </article>
    );
};

export default PostLoading;
