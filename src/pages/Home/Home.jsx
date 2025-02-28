import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./Home.css";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api");
                if (!response.ok) {
                    throw new Error("We can't get the categories");
                }
                const data = await response.json();
                console.log(data)
                const categories = Object.keys(data.result);
                dispatch({ type: "set_categories", payload: categories });
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
        
    }, []);

    const fixedPositions = [
        { top: "20%", left: "35%" }, 
        { top: "30%", left: "55%" },
        { top: "40%", left: "45%" },
        { top: "50%", left: "60%" },
        { top: "60%", left: "40%" },
        { top: "70%", left: "50%" },
    ];

    return (
        <div className="categories">
            {store.categories.map((category, index) => {
                const position = fixedPositions[index % fixedPositions.length];
                return (
                    <Link
                        key={index}
                        to={`/category/${category}`}
                        className="category-btn"
                        style={position}
                    >
                        {category}
                    </Link>
                );
            })}
        </div>
    );
};