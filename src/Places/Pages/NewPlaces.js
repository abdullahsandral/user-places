import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../Shared/Components/UI Element/Input';
import ImageInput from '../../Shared/Components/UI Element/ImageInput';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '../../Shared/Util/Validators/Validator';
import classes from './NewPlaces.module.css';
import { useDispatch } from 'react-redux';

const NewPlaces = () => {
    const dispatchPlaceAdded = useDispatch();
    const Authenticated = useContext(AuthContext);
    const uid = Authenticated.userId;
    const history = useHistory();

    const [adding, setAdding] = useState(false);

    const [formState, inputChangeHandler] = useForm({
        title: {
            inputValue: '',
            inputisValid: false
        },
        address: {
            inputValue: '',
            inputisValid: false
        },
        description: {
            inputValue: '',
            inputisValid: false
        },
        newPlaceImage: {
            inputValue: '',
            inputisValid: false
        },
    }, false)

    const addPlace = async e => {
        e.preventDefault();
        if (formState.inputs.newPlaceImage.inputValue.size > 5242880) { alert("Please Select An Image With Size Less than 5MB"); return }
        setAdding(true);
        try {
            const newPlaceData = new FormData();
            newPlaceData.append('title', formState.inputs.title.inputValue)
            newPlaceData.append('address', formState.inputs.address.inputValue)
            newPlaceData.append('description', formState.inputs.description.inputValue)
            newPlaceData.append('creator', uid)
            newPlaceData.append('newPlaceImage', formState.inputs.newPlaceImage.inputValue)

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/places',
                {
                    method: 'POST',
                    headers: { Authorization: "Bearer " + Authenticated.userToken },
                    body: newPlaceData
                });
            const responseData = await response.json();

            if (!response.ok) {
                setAdding(false);
                history.push(`/`);
                alert(responseData.errorCode + "\n" + responseData.errorMsg)
            }
            else {
                setAdding(false);
                dispatchPlaceAdded({ type: 'NEW_PLACE_ADDED' })
                history.push(`/${uid}/places`)
            }

        }
        catch (error) { setAdding(false); alert(error) }
    }

    return (

        <div className={classes.center} >
            {adding &&
                <Backdrop>
                    <Spinner />
                    <h2 style={{ color: 'gold' }}>Adding New Place...</h2>
                </Backdrop>
            }
            <form className={classes.addPlaceFORM} onSubmit={addPlace}>

                <ImageInput
                    id='newPlaceImage' Error="Please Pick an Image" height='300px'
                    onInputChange={inputChangeHandler}
                />
                <Input
                    id="title" type="Input" Label="Title"
                    pHolder="Enter The Name of Place"
                    Error="Please Enter a Valid Title with MINIMUM LENGTH of 5 and MAXIMUM LENGTH of 50 Words" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(5), MAX_LENGTH_VALIDATOR(50)]}
                />

                <Input
                    id="address" type="Input" Label="Address"
                    pHolder="Enter The Address of Place"
                    Error="Please Enter a Valid Address with MINIMUM LENGTH of 5 and MAXIMUM LENGTH of 80 Words" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(5), MAX_LENGTH_VALIDATOR(80)]}
                />

                <Input
                    id="description" type="textArea" Label="Description"
                    pHolder="Enter Description for Selected Place"
                    Error="Please Enter a Valid Description with MINIMUM LENGTH of 5" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(5)]}
                />

                <button disabled={!formState.formIsValid} className={`btn ${formState.formIsValid ? 'btn-outline-success' : 'btn-danger'}`}>
                    ADD PLACE
                </button>
            </form>
        </div>
    )
}

export default NewPlaces;