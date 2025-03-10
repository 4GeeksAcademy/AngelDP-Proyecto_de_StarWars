import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';
import useGlobalReducer from '../../hooks/useGlobalReducer';
import { useParams } from "react-router-dom";


export const ItemCard = () => {

    const { store, dispatch } = useGlobalReducer();
    const { category } = useParams();



    const isInFavorites = (item) => {
        return store.favorites.some(
            fav => fav.name === item.name && fav.id === item.uid && fav.category === category
        );
    };


    const handleImg = (cat, uid) => {

        if (cat === "planets" && uid === "1") {
            return "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357";
        }

        if (cat === "people") {
            return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`;
        }

        if (cat === "starships" && uid === "2") {
            return "https://lh4.googleusercontent.com/proxy/eoTL6ht_11pN5wTt3-CpHi6VaSloShUzYfB4dqpgWHxOA63koNMZ9NBKDaKkH32qKPvo9NqDknCftn1AGgAAP7yQte2VdBrzod-TaTI-oVZbZ4l-B9gz";
        }

        if (cat === "starships" && uid === "3") {
            return "https://www.super-hobby.es/zdjecia/9/3/4/48314_03609_i_imperial_star_destroyer-1-.jpg";
        }

        if (cat === "starships" && uid === "17") {
            return "https://static.wikia.nocookie.net/starwars/images/d/de/NewRepublicVolunteers-SWZ.png/revision/latest?cb=20210110181445";
        }

        return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${cat}/${uid}.jpg`;

    }

    const handleFav = (item) => {

        if (item) {

            const newFav = {

                name: item.name,
                category: category,
                id: item.uid

            };


            const exists = store.favorites.some(
                fav => fav.name === newFav.name && fav.id === newFav.id && fav.category === newFav.category

            );

            if (exists) {
                setDisable(true);
            }

            if (!exists) {

                dispatch({ type: "add_favorites", payload: newFav });
                setDisable(false);
            }
        };
    };

    
    return (
        <ul className="list-unstyled d-flex flex-wrap gap-4 justify-content-center mt-5">
            {store.items.map((item, index) => {

                const isFavorite = isInFavorites(item);

                return (

                    <li
                        key={index}
                        className="card text-white bg-transparent border-0"
                    >
                        <img
                            src={handleImg(category, item.uid)}
                            className="card-img-top"
                        />
                        <div className="card-body d-flex flex-column align-items-center">

                            <h5 className="card-title text-center mb-3">
                                {item.name}
                            </h5>

                            <div>
                                <Link
                                    to={`/category/${category}/${item.uid}`}
                                    className="btn btn-light text-dark py-2 px-4 mt-auto "
                                >
                                    See more...
                                </Link>

                                <button
                                    className={`btn btn-warning text-dark py-2 px-4 mt-auto ms-2 ${isFavorite ? "disabled-btn" : ""}`}
                                    onClick={() => handleFav(item)}
                                    disabled={isFavorite}
                                >
                                    {isFavorite ? "Added" : "Favs"}
                                </button>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
};