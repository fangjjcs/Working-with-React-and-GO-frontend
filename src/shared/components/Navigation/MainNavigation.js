import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";

import MainHeader from "./MainHeader";
import './MainNavigation.css';
import NavLinks from "./NavLinks"; 
import SideDrawer from "./SideDrawer";
import BackDrop from "../Backdrop/Backdrop"
import Footer from "../Footer/Footer";

const MainNavigation = props => {
    
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer =()=>{
        setDrawerIsOpen(true);
    }

    const closeDrawer =()=>{
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {drawerIsOpen? <BackDrop onClick={closeDrawer}/>: null }
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks/>
                    <Footer/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h2 className="main-navigation__title">
                    <Link to="/">{props.config.headerName}</Link>
                </h2>
                <nav className="main-navigation__header-nav-auth">
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </ul>
                </nav>
            </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;