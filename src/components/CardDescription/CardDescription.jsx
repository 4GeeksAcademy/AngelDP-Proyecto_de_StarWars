import React, { useEffect } from 'react';
import './CardDescription.css';
import { useParams } from 'react-router-dom';
import useGlobalReducer from '../../hooks/useGlobalReducer';

export const CardDescription = () => {

    const { store, dispatch } = useGlobalReducer();
    const { category, id } = useParams();


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

        if (cat === "starships" && uid === "2") {
            return "https://lh4.googleusercontent.com/proxy/eoTL6ht_11pN5wTt3-CpHi6VaSloShUzYfB4dqpgWHxOA63koNMZ9NBKDaKkH32qKPvo9NqDknCftn1AGgAAP7yQte2VdBrzod-TaTI-oVZbZ4l-B9gz";
        }

        if (cat === "planets" && uid === "1") {
            return "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357";
        }

        if (cat === "starships" && uid === "3") {
            return "https://www.super-hobby.es/zdjecia/9/3/4/48314_03609_i_imperial_star_destroyer-1-.jpg";
        }

        if (cat === "starships" && uid === "17") {
            return "https://static.wikia.nocookie.net/starwars/images/d/de/NewRepublicVolunteers-SWZ.png/revision/latest?cb=20210110181445";
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


            const exists = store.favorites.some(
                fav => fav.name === newFav.name && fav.category === newFav.category
            );

            if (!exists) {

                dispatch({ type: "add_favorites", payload: newFav});

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

                                    return key !== "created" && key !== "edited" && key !== "url" && key !== "homeworld" && key !== "films" && key !== "pilots" && key !== "people"? (
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