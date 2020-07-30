import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import { AuthContext } from '../../Contexts/Authentication-Context';
import NavLinks from './NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const Authenticated = useContext(AuthContext);
    const uImage = Authenticated.userImage;

    const [drawerState, setDrawerState] = useState(false)
    const DrawerHandler = () => {
        setDrawerState(!drawerState);
    }
    var S_Drawer = (<div className={classes.sideDrawer}>
        <SideDrawer drawerClicked={DrawerHandler} />
        <Backdrop backdropClicked={DrawerHandler} />
    </div>)
    var imgORtext = Authenticated.loggedIn ? <img src={`${process.env.REACT_APP_ASSET_URL}/${uImage}`} alt='User' /> : <b>USER PLACES</b>;
    return (
        <MainHeader>
            {drawerState ? S_Drawer : null}
            <button className={classes.menuBtn} onClick={DrawerHandler}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={classes.mainNavTitle}>
                <Link to=''>
                    {imgORtext}
                </Link>
            </div>
            <div className={classes.navLinks}>
                <NavLinks />
            </div>
        </MainHeader>
    )
}

export default MainNavigation;