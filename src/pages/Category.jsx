import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { Spinner } from "../components/Spinner/Spinner";

export const Category = () => {

    const { dispatch } = useGlobalReducer();
    const { category } = useParams();
    const [cargando, setCargando] = useState(true)


    useEffect(() => {

        setCargando(true);
        dispatch({ type: "set_items", payload: [] });

        const getItems = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${category}`);
                if (!response.ok) {
                    throw new Error("Can't get items for this category");
                }
                const data = await response.json();

                dispatch({ type: "set_items", payload: data.results });

                setCargando(false)

            } catch (error) {
                console.log(error);
            }
        };

        getItems();

    }, [category]);


    useEffect(() => {

        dispatch({ type: "set_selected_category", payload: category });
    }, [category, dispatch]);

    if (cargando) {
        return (
            <Spinner />
        )
    }


    return (
        <ItemCard />
    );
};