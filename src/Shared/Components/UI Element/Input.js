import React, { useReducer, useEffect } from 'react';

import {validator} from '../../Util/Validators/Validator';
import classes from './Input.module.css';

const inputReducer = (state , action) =>
{
    switch(action.type)
    {
        case "CHANGE":
        return{...state , inputValue : action.val , inputIsValid : validator(action.val , action.validators) }
        
        case "TOUCH":
        return {...state , touched : true}

        default:  return {...state}
    }
}

const Input = props =>
{
    var notValidLabelClass , notValidInputClass;
    if(props.rClass)   { notValidLabelClass = notValidInputClass = classes.gYellow;}
    else { notValidInputClass = classes.inputControl ; notValidLabelClass = classes.labelControl }
   


    const [inputState , dispatch ] = useReducer(
        inputReducer , 
        {inputValue : props.initialValue || '' ,
        inputIsValid : props.isValid || false , 
        touched : false})
    
    const changeHandler = (e) =>
    {
       dispatch({type : "CHANGE" , val : e.target.value , validators : props.validators});
    }
    const touchHandler = (e) =>
    {
       dispatch({type : "TOUCH"});
    }
    var InputType = null;
    props.type === "Input" ? InputType = (
    <input  className = {!inputState.inputIsValid && inputState.touched ? notValidInputClass : null} 
        type={props.fieldType || 'text'}          
        placeholder={props.pHolder} 
        value = {inputState.inputValue}
        onBlur={touchHandler} 
        onChange = {changeHandler} 
    />) 
    : InputType = (
    <textarea className = {!inputState.inputIsValid && inputState.touched ? notValidInputClass : null}
        type='text' rows='5' 
        wrap = 'hard'
        placeholder={props.pHolder}
        value = {inputState.inputValue}
        onBlur={touchHandler} 
        onChange = {changeHandler}
    />)
    
    const {onInputChange, id} = props;
    const {inputValue , inputIsValid} = inputState;
        useEffect( () => 
        {   
            onInputChange(id , inputValue , inputIsValid);
        }, [id , inputValue , inputIsValid , onInputChange])
        

    return (
        <React.Fragment>
        <label className = {`${!inputState.inputIsValid && inputState.touched && notValidLabelClass}`}><b>{props.Label}</b></label>
        {InputType}
        {!inputState.inputIsValid && inputState.touched && <p className={notValidLabelClass}>{props.Error}</p>} 
        </React.Fragment>
    )
}
export default Input;