import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../Shared/Components/UI Element/Spinner';
import PlacesList from '../Components/PlacesList';
import classes from './UserPlaces.module.css';

const UserPlaces = props => {
    const [errorMessage, setErrorMessage] = useState();
    const placesFetched = useSelector(state => state.placesFetched);
    const [placesLoadingState, setPlacesLoadingState] = useState(!placesFetched);

    const userId = useParams().uid;
    const dispatchUsersPlaces = useDispatch();
    const userPlaces = useSelector(state => state.allPlaces.filter(place => place.userUID.toString() === userId));

    const getPlaceByUserId = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places`);
            const places = await response.json();

            setPlacesLoadingState(false);
            if (response.ok)
                dispatchUsersPlaces({ type: 'PLACES_FETCHED', value: places })
            // else    throw new Error(places.errorMsg)

        } catch (error) { setErrorMessage(error.message); setPlacesLoadingState(false); }
    }, [dispatchUsersPlaces])
    const deletePlaceHandler = () => {
        setPlacesLoadingState(true)
        getPlaceByUserId();
    }

    useEffect(() => {
        if (!placesFetched) getPlaceByUserId();
    }, [placesFetched, getPlaceByUserId])

    return <>
        {placesLoadingState &&
            <div className={classes.spinnerCenter}>
                <Spinner />
                <h2>Loading...</h2>
            </div>
        }
        {!placesLoadingState &&
            <div className={classes.center}>
                <PlacesList userPlaces={userPlaces} onDeletePlace={deletePlaceHandler} error={errorMessage} />
            </div>
        }
    </>

}



export default UserPlaces;