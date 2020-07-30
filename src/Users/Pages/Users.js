import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import UserList from '../Components/UserList';
import classes from './Users.module.css'

const Users = props => {
    const [errorMessage, setErrorMessage] = useState();
    const users = useSelector(state => state.allUsers);
    const usersFetched = useSelector(state => state.usersFetched);
    const [userLoadingState, setUserLoadingState] = useState(!usersFetched);
    const dispatchUsers = useDispatch();

    const getUsers = useCallback(async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users');
            const data = await response.json();

            setUserLoadingState(false);

            if (response.ok)
                dispatchUsers({ type: 'USERS_FETCHED', value: data })

            else throw new Error(data.errorMsg)

        } catch (error) { setErrorMessage(error.message); setUserLoadingState(false); }
    }, [dispatchUsers])
    useEffect(() => {
        if (!usersFetched) getUsers();
    },
        [usersFetched, getUsers])

    return (

        <>
            {userLoadingState &&
                <div className={classes.center}>
                    <Spinner />
                    <h2>Loading...</h2>
                </div>
            }

            {!userLoadingState &&
                <div>
                    <UserList users={users} error={errorMessage} />
                </div>
            }

        </>
    )
}



export default Users;