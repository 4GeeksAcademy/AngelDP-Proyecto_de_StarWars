import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const ItemDescription = () => {

    const { category, id } = useParams();
    const { store } = useGlobalReducer();

    const [properties, setProperties] = useState([])

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

                setProperties(properties)
                

            } catch (error) {
                console.log(error)
            }
        }

        getItemDescription();
    }, [category]);



    return (
        <ul>
            {Object.entries(properties).map(([key, value], index) => (
                <li key={index}>
                    <strong>{key}:</strong> {value}
                </li>
            ))}
        </ul>
    )
}