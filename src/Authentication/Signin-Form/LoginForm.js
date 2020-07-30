import React, { useContext, useState } from 'react';

import Input from '../../Shared/Components/UI Element/Input';
import Spinner from '../../Shared/Components/UI Element/Spinner';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import { AuthContext } from '../../Shared/Contexts/Authentication-Context';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { MIN_LENGTH_VALIDATOR, EMAIL_VALIDATOR } from '../../Shared/Util/Validators/Validator';
import classes from './LoginForm.module.css';

const LoginForm = () => {
    const Authenticated = useContext(AuthContext);

    const [signIn, setSignIn] = useState(false);

    const [formState, inputChangeHandler] = useForm({
        email: {
            inputValue: '',
            inputisValid: false
        },
        password: {
            inputValue: '',
            inputisValid: false
        },
    }, false)

    const submitForm = async e => {
        setSignIn(true);
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/users/signin',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            email: formState.inputs.email.inputValue,
                            password: formState.inputs.password.inputValue,
                        }
                    )
                })

            const responseData = await response.json();
            if (!response.ok) {
                setSignIn(false);
                alert(responseData.errorCode + "\n" + responseData.errorMsg);
            }
            else {
                setSignIn(false);
                // console.log(responseData);
                Authenticated.login(responseData.U_ID, responseData.U_Image, responseData.U_Token)
            }

        } catch (error) { setSignIn(false); alert(error) }

    }

    return (
        <div className={classes.center}>
            {signIn &&
                <Backdrop>
                    <Spinner />
                    <h2 style={{ color: 'gold' }}>Signing In</h2>
                </Backdrop>
            }
            <form className={classes.addPlaceFORM} onSubmit={submitForm}>
                <h3 style={{ alignSelf: 'center' }}>SignIn</h3>
                <Input
                    id="email" type="Input" fieldType='email' Label="Email"
                    pHolder="Enter Email Address" rClass='gYellow'
                    Error="Please Enter a Valid Email" onInputChange={inputChangeHandler}
                    validators={[EMAIL_VALIDATOR()]}
                />

                <Input
                    id="password" type="Input" fieldType='password' Label="Password"
                    pHolder="Enter Password" rClass='gYellow'
                    Error="Password Field is Required" onInputChange={inputChangeHandler}
                    validators={[MIN_LENGTH_VALIDATOR(1)]}
                />

                <button className='btn btn-outline-success p-2 mt-3' disabled={!formState.formIsValid}>
                    LOG IN
                </button>
            </form>
        </div>
    )
}

export default LoginForm;