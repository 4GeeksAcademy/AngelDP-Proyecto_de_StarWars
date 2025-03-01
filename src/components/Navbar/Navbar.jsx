import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    
    const [favorites, setFavorites] = useState([]);
    
    
    useEffect(() => {
        const loadFavorites = () => {
            const saved = localStorage.getItem('favorites');
            if (saved) {
                setFavorites(JSON.parse(saved));
            }
        };
        
        loadFavorites();
       
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg" 
                        alt="Death Star"
                        className="btn starwarsLogo"
                        width="200"
                        height="80"
                    />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Favorites {favorites.length > 0 && `(${favorites.length})`}
                            </a>
                            <ul className="dropdown-menu">
                                {favorites.length === 0 ? (
                                    <li><span className="dropdown-item">No favorites yet</span></li>
                                ) : (
                                    favorites.map((fav, index) => (
                                        <li key={index}>
                                            <Link 
                                                className="dropdown-item" 
                                                to={`/${fav.category}/${fav.id}`}
                                            >
                                                {fav.name}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};