import React from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = props => {

    const links = props.links
    const groups = [...new Set(links.map(item => item.group))];
    
    const Links = groups.map( (group, key) => {
        return(
            <React.Fragment key={group}>
                <div className="group-label" key={group+key}>{group}</div>
                {links.filter(links => links.group === group).map( (link, liKey) => {
                    return(
                        <li onClick={props.onClose} key={group+key+liKey}> 
                            <NavLink to={link.to} exact>{link.name}</NavLink>
                        </li>
                    )
                })}
            </React.Fragment>
        )
    })
    return <ul className="nav-links" >
        {Links}
    </ul>
}

export default NavLinks;