import React from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links" >
        <li onClick={props.onClose}> 
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li onClick={props.onClose}>
            <NavLink to="/movies">Movies</NavLink>
        </li>
        <li onClick={props.onClose}>
            <NavLink to="/genres">Genres</NavLink>
        </li>
        <li onClick={props.onClose}>
            <NavLink to="/add-movie">Add movie</NavLink>
        </li>
    </ul>
}

export default NavLinks;