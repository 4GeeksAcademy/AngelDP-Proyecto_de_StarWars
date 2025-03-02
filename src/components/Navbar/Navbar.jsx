import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";


export const Navbar = () => {

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleDelete = (id, category) => {

        dispatch({ type: "delete_favorites", payload: { id, category } });
    }

    const handleSearchChange = (e) => {

        const term = e.target.value;
        setSearch(term)

        console.log("Texto actual del input:", term);
        console.log("Items en store:", store.items);

        if (!term.trim()) {
            setSuggestions([]);
            return;
        }

        const filteredItems = store.items.filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );

        setSuggestions(filteredItems.slice(0, 5));
    };


    const handleSuggestionClick = (category, id) => {

        navigate(`/category/${category}/${id}`);

        setSearch("")

        setSuggestions([]);

    };


    const handleSearchSubmit = (e) => {

        e.preventDefault();

        if (!search.trim()) {
            return;
        }

        const foundItem = store.items.find((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        if (foundItem) {

            navigate(`/category/${foundItem.category}/${foundItem.id}`);
            setSearch("");
            setSuggestions([]);

        }
    };


    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg"
                        className="btn starwarsLogo"
                        width="200"
                        height="80"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Favorites {store.favorites.length > 0 && `(${store.favorites.length})`}
                            </button>
                            <ul className="dropdown-menu">
                                {store.favorites.length === 0 ? (
                                    <li>
                                        <span className="dropdown-item">No favorites yet</span>
                                    </li>
                                ) : (
                                    store.favorites.map((fav) => (
                                        <li key={fav.id} className="d-flex p-1 align-items-center">
                                            <Link className="dropdown-item" to={`/category/${fav.category}/${fav.id}`}>
                                                {fav.name}
                                            </Link>
                                            <button
                                                className="btn btn-info text-dark ms-2"
                                                onClick={() => handleDelete(fav.id, fav.category)}
                                            >
                                                X
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </li>
                    </ul>


                    {store.selectedCategory && (

                        <>

                            <div className="d-flex justify-content-around w-100">
                                {store.categories && store.categories.map((category, index) => {

                                    if (category === "films") return null;

                                    return (
                                        <button
                                        key={index}
                                        className="btn btn-outline-success"
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </button>
                                    )
                                    
                                })}
                            </div>

                            <form className="d-flex position-relative" role="search" onSubmit={handleSearchSubmit}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>

                                {suggestions.length > 0 && (
                                    <ul className="suggestions-list position-absolute">
                                        {suggestions.map((item, index) => (
                                            <li
                                                key={index}
                                                className="suggestion-item"
                                                onClick={() => handleSuggestionClick(item.category, item.id)}
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </form>
                        </>

                    )}

                </div>
            </div>
        </nav>
    );
};