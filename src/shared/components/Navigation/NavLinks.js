import React, {useContext} from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import AuthContext from "../../context/auth-context";

const NavLinks = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
      <li>
        <NavLink to="/genres">Genres</NavLink>
      </li>
      {authContext.isLogin && (<li>
        <NavLink to="/admin">Admin</NavLink>
      </li>)}
    </ul>
  );
};

export default NavLinks;
