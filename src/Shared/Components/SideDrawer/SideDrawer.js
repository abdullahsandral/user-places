import React from 'react';

import NavLinks from '../MainNvigation/NavLinks';
import classes from './SideDrawer.module.css';

const SideDrawer = props =>
{
    return <div className={classes.sideDrawer} onClick = {props.drawerClicked}><NavLinks/></div>    
}

export default SideDrawer;