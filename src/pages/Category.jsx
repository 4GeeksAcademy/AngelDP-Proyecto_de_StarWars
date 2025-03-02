import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ItemCard } from "../components/ItemCard/ItemCard";

export const Category = () => {

    const { dispatch } = useGlobalReducer();
    const { category } = useParams();


    useEffect(() => {



        const getItems = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${category}`);
                if (!response.ok) {
                    throw new Error("Can't get items for this category");
                }
                const data = await response.json();

                dispatch({ type: "set_items", payload: data.results });
            } catch (error) {
                console.log(error);
            }
        };

        getItems();

    }, [category]);


    useEffect(() => {
        
        dispatch({ type: "set_selected_category", payload: category });
    }, [category, dispatch]);

    return (
        <ItemCard />
    );
};