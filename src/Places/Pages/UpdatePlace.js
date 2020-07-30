import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../Shared/Components/UI Element/Input';
import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { MIN_LENGTH_VALIDATOR } from '../../Shared/Util/Validators/Validator';
import Card from '../../Shared/Components/Card/Card';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import classes from './NewPlaces.module.css'


const UpdatePlace = props => {
    const dispatchPlaceUpdated = useDispatch();
    const Authenticated = useContext(AuthContext);
    const history = useHistory();

    const uid = Authenticated.userId;
    const pID = useParams().pID;

    const [place, setPlace] = useState();
    const [updating, setUpdating] = useState(false);
    const place2BeUpdated = useSelector(state => state.allPlaces.find(place => place.P_ID.toString() === pID));

    const [formState, inputChangeHandle, dataSetter] = useForm({
        title: {
            inputValue: '',
            inputisValid: false
        },
        description: {
            inputValue: '',
            inputisValid: false
        },
    }, false)

    const getPlaceById = useCallback(async () => {
        if (place2BeUpdated) {
            dataSetter(
                {
                    title: {
                        inputValue: place2BeUpdated.P_Title,
                        inputisValid: true
                    },
                    description: {
                        inputValue: place2BeUpdated.P_Description,
                        inputisValid: true
                    },
                }, true)
            setPlace(place2BeUpdated);
        }
    }, [place2BeUpdated, dataSetter])


    useEffect(() => {
        getPlaceById();
    }, [getPlaceById])

    const submitUpdatedPlace = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${pID}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + Authenticated.userToken
                    },
                    body: JSON.stringify(
                        {
                            title: formState.inputs.title.inputValue,
                            description: formState.inputs.description.inputValue,
                        }
                    )
                });
            const responseData = await response.json();

            if (!response.ok) {
                setUpdating(false);
                history.push(`/${uid}/places`);
                alert(responseData.errorCode + "\n" + responseData.errorMsg)
            }
            else {
                setUpdating(false);
                dispatchPlaceUpdated({ type: 'PLACE_UPDATED' });
                history.push(`/${uid}/places`)
            }
        }
        catch (error) { setUpdating(false); alert(error) }
    }

    if (!place) return <Card>   <h4>Loading...</h4>  </Card>

    else
        return (
            <div className={classes.center}>
                {updating &&
                    <Backdrop>
                        <Spinner />
                        <h2 style={{ color: 'gold' }}>Updating...</h2>
                    </Backdrop>
                }
                <form className={classes.addPlaceFORM} onSubmit={submitUpdatedPlace}>

                    <Input
                        id="title" type="Input" Label="Title" initialValue={formState.inputs.title.inputValue}
                        pHolder="Enter The Name of Place" isValid={formState.inputs.title.inputisValid}
                        Error="Please Enter a Valid Title with MINIMUM LENGTH of 5" onInputChange={inputChangeHandle}
                        validators={[MIN_LENGTH_VALIDATOR(5)]}
                    />

                    <Input
                        id="description" type="TextArea" Label="Description" initialValue={formState.inputs.description.inputValue}
                        pHolder="Enter Description for Selected Place" isValid={formState.inputs.description.inputisValid}
                        Error="Please Enter a Valid Description with MINIMUM LENGTH of 5" onInputChange={inputChangeHandle}
                        validators={[MIN_LENGTH_VALIDATOR(5)]}
                    />

                    <button disabled={!formState.formIsValid} className={`btn ${formState.formIsValid ? 'btn-outline-success' : 'btn-danger'}`}>
                        UPDATE PLACE
                </button>
                </form>
            </div>

        )
}


export default UpdatePlace;