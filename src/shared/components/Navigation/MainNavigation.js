import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import MainHeader from "./MainHeader";
import './MainNavigation.css';
import NavLinks from "./NavLinks"; 
import SideDrawer from "./SideDrawer";
import BackDrop from "../Backdrop/Backdrop"
import Footer from "../Footer/Footer";
import { Avatar, Drawer } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


const MainNavigation = props => {
    
    const classes = useStyles();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer =()=>{
        setDrawerIsOpen(!drawerIsOpen);
    }

    const closeDrawer =()=>{
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {/* <Drawer open={drawerIsOpen} onClose={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks onClose={closeDrawer}/>
                    <Footer/>
                </nav>
            </Drawer> */}
            {drawerIsOpen? <BackDrop onClick={closeDrawer}/>: null }
            <SideDrawer show={drawerIsOpen} >
                <nav className="main-navigation__drawer-nav">
                    <NavLinks onClose={closeDrawer}/>
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
                <nav className="main-navigation__header-nav-avatar">
                    <Avatar className={classes.small}>N</Avatar>
                </nav>
            </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;