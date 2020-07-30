import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import classes from './PlaceDetail.module.css';


const DetailPlace = props => {
    const pID = useParams().pID;

    const Authenticated = useContext(AuthContext);
    var place;

    const dispatchUsersPlaces = useDispatch();
    place = useSelector(state => state.allPlaces.find(place => place.P_ID.toString() === pID))
    const getPlaces = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places`);
            const places = await response.json();

            if (response.ok)
                dispatchUsersPlaces({ type: 'PLACES_FETCHED', value: places })

        } catch (error) { alert(error) }
    }

    if (!place) getPlaces();

    if (!place)
        return <div className={classes.spinnerCenter}>
            <Spinner />
            <h2>Loading...</h2>
        </div>

    else
        return (
            <React.Fragment>

                <div className={classes.center}>
                    <div className={`row  ${classes.placeDetail}`}>
                        <div className='col-12 p-0'>
                            {/* <img src = {place.P_Image} alt='Place'/> */}
                            <img src={`${process.env.REACT_APP_ASSET_URL}/${place.P_Image}`} alt='Place' />
                        </div>
                        <div className='col-12 text-center pt-3'>
                            <h4>{place.P_Title}</h4>
                        </div>
                        <div className='col-12 text-center pt-3'>
                            <h5>{place.P_Address}</h5>
                        </div>
                        <div className='col-12 text-center pt-3'>
                            <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{place.P_Description}</p>
                        </div>
                        <div className='row w-100 m-0 justify-content-center'>

                            {Authenticated.userId === place.userUID.toString() && (
                                <div className='col-12 col-md-6 pl-md-1 order-md-1'>
                                    <Link to={`/places/${place.P_ID}/update`}><button className='btn btn-success w-100 mb-2'>EDIT</button></Link>
                                </div>
                            )}

                            <div className='col-12 col-md-6 pr-md-1  '>
                                <Link to={`/${place.userUID}/places`}><button className='btn btn-outline-dark w-100 mb-2'>GO BACK</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
}


export default DetailPlace;