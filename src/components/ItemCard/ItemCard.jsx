import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css'; 

export const ItemCard = (props) => {
    return (
        <ul className="list-unstyled d-flex flex-wrap gap-4 justify-content-center mt-5">
            {props.store.items.map((item, index) => (
                <li
                    key={index}
                    className="card text-white bg-transparent border-0"
                >
                    <img
                        src={props.handleImg(props.category, item.uid)}
                        className="card-img-top"
                        alt={item.name}
                    />
                    <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title text-center mb-3">
                            {item.name}
                        </h5>
                        <Link
                            to={`/category/${props.category}/${item.uid}`}
                            className="btn btn-light text-dark py-2 px-4 mt-auto"
                        >
                            See more...
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};