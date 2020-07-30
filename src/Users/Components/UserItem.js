import React from 'react';
import { Link } from 'react-router-dom'

import classes from './UserItem.module.css';

const UserItem = (props) => {
    return (
        <>
            <li className={classes.user_item}>
                <Link to={`/${props.id}/places`}>
                    <div className={classes.user_item_image}>
                        {/* <img src={props.image} alt='' /> */}
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={'User'} />
                    </div>
                    <div className={classes.user_item_info}>
                        <b><p>{props.name}</p></b>
                        <b><p> {props.totalPlaces} {props.totalPlaces <= '1' ? 'Place' : 'Places'}</p></b>
                    </div>
                </Link>
            </li>
        </>

    )
}

export default UserItem;