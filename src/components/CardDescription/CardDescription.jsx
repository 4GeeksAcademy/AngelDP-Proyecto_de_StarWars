import React from 'react';
import './CardDescription.css'; 

export const CardDescription = (props) => {


    return (
        <div className="cardDescription text-white bg-transparent border-0" style={{ width: '20rem' }}>
            <div className="card-body">
                <h5 className="card-title text-center mb-3">{props.properties.name}</h5>
                <ul className="list-properties">
                    {Object.entries(props.properties).map(([key, value], index) => (
                        <li key={index} className="mb-2">
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};