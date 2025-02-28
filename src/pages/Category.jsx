import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { ItemCard } from "../components/ItemCard/ItemCard";

export const Category = () => {

    const { store, dispatch } = useGlobalReducer();
    const { category } = useParams();


    useEffect(() => {


        const getItems = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${category}`);
                if (!response.ok) {
                    throw new Error("Can't get items for this category");
                }
                const data = await response.json();
                console.log(data)
                dispatch({ type: "set_items", payload: data.results });

            } catch (error) {
                console.log(error);
            }
        };

        getItems();

    }, [category]);

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

    return (
        <ItemCard
            handleImg={handleImg}
            store={store}
            category={category}
        />
    );
};