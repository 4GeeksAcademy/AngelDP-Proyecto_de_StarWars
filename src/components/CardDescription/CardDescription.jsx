import React, { useEffect, useState } from 'react';
import './CardDescription.css';
import { useParams } from 'react-router-dom';
import useGlobalReducer from '../../hooks/useGlobalReducer';

export const CardDescription = () => {

    const { store, dispatch } = useGlobalReducer();
    const { category, id } = useParams();


    const [favorites, setFavorites] = useState(() => {

        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];

    });


    useEffect(() => {

        localStorage.setItem('favorites', JSON.stringify(favorites));

    }, [favorites]);



    useEffect(() => {

        const getItemDescription = async () => {

            try {
                const response = await fetch(
                    `https://www.swapi.tech/api/${category}/${id}`
                )

                if (!response.ok) {
                    throw new Error("We can't get the ID")
                }

                const data = await response.json();
                console.log(data)

                const properties = data.result.properties;
                console.log(properties)

                dispatch({ type: "set_properties", payload: properties })


            } catch (error) {
                console.log(error)
            }
        }

        getItemDescription();
    }, [id, category]);


    const handleImg = (cat, uid) => {

        if (cat === "people") {
            return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`;
        }

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${cat}/${uid}.jpg`;
    }


    const handleFav = () => {

        if (store.properties?.name) {

            const newFav = {

                name: store.properties.name,
                category: category,
                id: id

            };


            const exists = favorites.some(
                fav => fav.name === newFav.name && fav.category === newFav.category
            );

            if (!exists) {

                setFavorites([...favorites, newFav]);

            }
        };
    };

    return (
        <div className='card-container'>
            <div className="cardDescription text-white bg-transparent border-0">
                <div className="card-content">
                    <div className="image-container">
                        <img src={handleImg(category, id)} alt="Category Image" />
                    </div>
                    <div className="text-container">
                        <h1 className="card-title mb-3">
                            {store.properties?.name || "Loading..."}
                        </h1>

                        <ul className="list-properties">
                            {store.properties
                                ? Object.entries(store.properties).map(([key, value], index) => {

                                    return key !== "created" && key !== "edited" && key !== "url" && key !== "homeworld" && key !== "films" && key !== "pilots" ? (
                                        <li key={index} className="mb-2">
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ) : null;
                                })
                                : <li>Loading...</li>}
                        </ul>
                        <button
                            className="btn btn-warning text-dark py-2 px-4 mt-auto ms-2"
                            onClick={handleFav}
                        >
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};