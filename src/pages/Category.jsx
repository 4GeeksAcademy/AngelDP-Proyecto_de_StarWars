import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

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

    return (
        <ul>
            {store.items.map((item, index) => (
                <li key={index}>

                    <Link
                        to={`/category/${category}/${item.uid}`}
                    >

                        {item.name}

                    </Link>

                </li>
            ))}
        </ul>
    );
};