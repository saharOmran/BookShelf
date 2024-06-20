import React from 'react';
import { useNavigate } from 'react-router-dom';
import './allbooks.css';

const CategoryCard = ({ name, image }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/CategoryBooks/${name}`);
    };

    return (
        <div className="category-card" onClick={handleClick}>
            <img src={image} alt={name} className="category-image" />
            <div className="category-name">{name}</div>
        </div>
    );
};

export default CategoryCard;
