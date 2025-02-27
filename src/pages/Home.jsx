import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();


    useEffect(() => {

        const getCategories = async () => {

            try {
                const response = await fetch(
                    "https://www.swapi.tech/api"
                );

                if (!response.ok) {
                    throw new Error("We can't get the categories")
                }

                const data = await response.json();

                const categories = Object.keys(data.result)

                dispatch({ type: "set_categories", payload: categories })

            } catch (error) {
                console.log(error)
            }
        }

        getCategories();
    }, [])


    return (
        <ul>
            {store.categories.map((category, index) => (
                <li key={index}>
                    <Link
                        to={`/category/${category}`}
                    >
                        {category}
                    </Link>
                </li>
            ))}
        </ul>
    );
};