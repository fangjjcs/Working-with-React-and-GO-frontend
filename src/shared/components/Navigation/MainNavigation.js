import React, {useState,useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import MainHeader from "./MainHeader";
import './MainNavigation.css';
import SideDrawer from "./SideDrawer";
import BackDrop from "../Backdrop/Backdrop"
import Footer from "../Footer/Footer";
import { Avatar, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import NavLinks from "./NavLinks";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: "1rem",
    }
  }));



const MainNavigation = props => {
    
    const classes = useStyles();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const linksArr = props.links;
    const [links, setLinks] = useState(linksArr)

    const openDrawer = () =>{
        setDrawerIsOpen(!drawerIsOpen);
    }

    const closeDrawer = (event) =>{
        setDrawerIsOpen(false);
    }

    const closeDrawerAndSwitch = (event) => {
        const route = window.location.hash.split("#")[1]
        props.getHeader(route)
        setDrawerIsOpen(false);
        setLinks(linksArr)
    }

    const onChangeTextHandler = (event) => {
        if(event.target.value === "") {
            setLinks(linksArr)
        } else {
            setLinks(linksArr.filter(link => link.name.toLowerCase().includes(event.target.value.toLowerCase())))
        }
    }

    return (
        <React.Fragment>
            {drawerIsOpen? <BackDrop onClick={closeDrawer}/>: null }
            <SideDrawer show={drawerIsOpen}>
                <nav className="main-navigation__drawer-nav">
                    <div className="search-field">
                        <TextField className="search-field__text" id="standard-basic" label="Search Page ..."  onChange={onChangeTextHandler}/>
                    </div>
                    <NavLinks links={links} onClose={closeDrawerAndSwitch}/>
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
                    <Link to="/">{props.config.headerName} / {props.header}</Link>
                </h2>
                <nav className="main-navigation__header-nav-avatar">
                    <Avatar className={classes.small}>N</Avatar>
                </nav>
            </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;