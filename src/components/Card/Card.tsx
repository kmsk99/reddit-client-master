import React from 'react';

const Card: React.FC<{ className?: string }> = (props) => {
    return (
        <div
            className={`bg-white mb-8 rounded p-6 text-gray-600 shadow-lg hover:shadow-xl ${props.className}`}
        >
            {props.children}
        </div>
    );
};

export default Card;
