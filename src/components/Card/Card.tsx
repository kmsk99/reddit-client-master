import React from 'react';
import './Card.css';

const Card: React.FC<{ className?: string }> = (props) => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
