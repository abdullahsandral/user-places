import React , {useContext} from 'react';

import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../Contexts/Authentication-Context';
import classes from './NavLinks.module.css';

const NavLinks = props =>
{
    const Authenticated = useContext(AuthContext);
    const uid = Authenticated.userId;
    const signOUT = () =>
    {
        Authenticated.logout()
    }

    return  <ul className={classes.navLinks}>
                <li className={classes.navLink}>
                    <NavLink to='/'>ALL USERS</NavLink>
                </li>
                {Authenticated.loggedIn &&  (
                <React.Fragment>
                <li className={classes.navLink}>
                    <NavLink to={`/${uid}/places`}>MY PLACES</NavLink>
                </li> 
                <li className={classes.navLink}>
                    <NavLink to='/places/new'>ADD PLACE</NavLink>
                </li>
                <li className={classes.navLink}>
                    <NavLink to='/' onClick={signOUT}>SIGN OUT</NavLink>
                </li> 
                </React.Fragment>
                 )}
                {!Authenticated.loggedIn &&  (
                <React.Fragment>
                <li className={classes.navLink}>
                    <NavLink to='/login'>SIGN IN</NavLink>
                </li>
                <li className={classes.navLink}>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                </li> 
                </React.Fragment>
                 )}
            </ul>
}

export default NavLinks;