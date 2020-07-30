import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '../../Shared/Components/UI Element/Input';
import ImageInput from '../../Shared/Components/UI Element/ImageInput';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { MIN_LENGTH_VALIDATOR, EMAIL_VALIDATOR, MAX_LENGTH_VALIDATOR } from '../../Shared/Util/Validators/Validator';
import classes from './SignUpFrom.module.css';

const SignUpForm = () => {
    const Authenticated = useContext(AuthContext);
    const dispatchSignupAction = useDispatch();

    const [signUp, setSignUp] = useState(false);

    const [formState, inputChangeHandler] = useForm({
        userName: {
            inputValue: '',
            inputisValid: false
        },
        userImage: {
            inputValue: '',
            inputisValid: false
        },
        email: {
            inputValue: '',
            inputisValid: false
        },
        password: {
            inputValue: '',
            inputisValid: false
        },
        conform_password: {
            inputValue: '',
            inputisValid: false
        },
    }, false)

    const submitForm = async e => {
        e.preventDefault();

        if (formState.inputs.password.inputValue === formState.inputs.conform_password.inputValue) {
            if (formState.inputs.userImage.inputValue.size > 3145728) { alert("Please Select An Image With Size Less than 3MB"); return }
            setSignUp(true);
            try {
                const SignUpData = new FormData();
                SignUpData.append('name', formState.inputs.userName.inputValue);
                SignUpData.append('email', formState.inputs.email.inputValue);
                SignUpData.append('password', formState.inputs.password.inputValue);
                SignUpData.append('userImage', formState.inputs.userImage.inputValue);

                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/signup',
                    {
                        method: 'POST',
                        body: SignUpData,
                    })

                const responseData = await response.json();
                if (!response.ok) {
                    setSignUp(false);
                    alert(responseData.errorCode + "\n" + responseData.errorMsg);
                }
                else {
                    setSignUp(false);
                    dispatchSignupAction({ type: 'SIGN_UP' })
                    Authenticated.login(responseData.U_ID, responseData.U_Image, responseData.U_Token)
                }

            } catch (error) { setSignUp(false); console.dir(error); alert(error) }
        }
        else alert("Passwords Do not Match")
    }

    return (
        <div className={classes.center} >
            {signUp &&
                <Backdrop>
                    <Spinner />
                    <h2 style={{ color: 'gold' }}>Signing Up</h2>
                </Backdrop>
            }
            <form className={classes.signUpMainForm} onSubmit={submitForm}>
                <h3 style={{ alignSelf: 'center' }}>SignUp</h3>

                <div className='row align-items-center px-md-2'>
                    <div className='col-md-6 col-12 order-md-2'>
                        <ImageInput
                            id='userImage' Error="Please Pick an Image" height='200px' maxSize={3}
                            onInputChange={inputChangeHandler}
                        />
                    </div>
                    <div className='col-md-6 col-12 order-md-1'>
                        <Input
                            id="userName" type="Input" fieldType='text' Label="Name"
                            pHolder="Enter Your Name" rClass='gYellow'
                            Error="Name Field is Required with MAXIMUM LENGTH of 25 Words" onInputChange={inputChangeHandler}
                            validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(25)]}
                        />
                        <Input
                            id="email" type="Input" fieldType='email' Label="Email"
                            pHolder="Enter Email Address" rClass='gYellow'
                            Error="Please Enter a Valid Email" onInputChange={inputChangeHandler}
                            validators={[EMAIL_VALIDATOR()]}
                        />
                    </div>

                </div>

                <div className='row p-md-2'>
                    <div className='col-md-6 col-12'>
                        <Input
                            id="password" type="Input" fieldType='password' Label="Password"
                            pHolder="Enter Password" rClass='gYellow'
                            Error="Password Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange={inputChangeHandler}
                            validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(15)]}
                        />
                    </div>
                    <div className='col-md-6 col-12'>
                        <Input
                            id="conform_password" type="Input" fieldType='password' Label="Conform Password"
                            pHolder="Enter Password" rClass='gYellow'
                            Error="Password Field is Required with MAXIMUM LENGTH of 15 Words" onInputChange={inputChangeHandler}
                            validators={[MIN_LENGTH_VALIDATOR(1), MAX_LENGTH_VALIDATOR(15)]}
                        />
                    </div>
                </div>

                <button className='btn btn-outline-success p-2 mt-3 mx-md-2' disabled={!formState.formIsValid}>
                    SIGN UP
                    </button>



            </form>
        </div>
    )
}

export default SignUpForm;