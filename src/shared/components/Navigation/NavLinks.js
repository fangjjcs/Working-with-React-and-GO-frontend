import React from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
            <NavLink to="/genres">Genres</NavLink>
        </li>
        <li>
            <NavLink to="/add-movie">Add movie</NavLink>
        </li>
    </ul>
}

export default NavLinks;