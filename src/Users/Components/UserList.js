import React from 'react';

import UserItem from './UserItem'
import classes from './UserList.module.css';

const UserList = (props) =>
{
    if(props.users.length === 0)
    {
        return(
            <div className = {classes.center}>
                <h2 style={{color: 'white'}}>No User Found</h2>
                {/* <br/>
                {props.error && <h2 style={{color: 'white'}}>ERROR : {props.error}</h2>} */}
            </div>
        )
    }
    else 
    { 
        return(
            <div className = {classes.oneUser}>
                <ul>
                {props.users.map( (v) =>
                <UserItem  
                    key = {v.U_ID}
                    id = {v.U_ID}
                    name = { v.U_Name}
                    image = {v.U_Image}
                    totalPlaces = {v.U_Places}
                />
                )}
                </ul>
            </div>
            
        )
    }
}

export default UserList;