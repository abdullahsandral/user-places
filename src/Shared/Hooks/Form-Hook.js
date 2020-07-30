import {useReducer , useCallback} from 'react';

const formReducer = ( state , action ) =>
{
    switch(action.type)
    {
        case "INPUT_CHANGE":
        let validForm = true;
            for(const inputId in state.inputs)
            {
                if(inputId === action.id)
                {  
                    validForm = validForm && action.inputIsValid;
                }
                else 
                {   validForm = validForm && state.inputs[inputId].inputIsValid; }
            
            }
            return {
                    ...state ,
                    inputs : {
                        ...state.inputs,
                        [action.id] : {inputValue : action.inputValue , inputIsValid : action.inputIsValid} },
                    formIsValid : validForm,
                };
        case "SET_DATA":
            return{
                inputs : action.inputsValues,
                formIsValid : action.ValidForm
            }

        default: return state;
    }
}

export const useForm = (inputsValues , Initial_formState) =>
{
    const [formState , dispatch] = useReducer(formReducer , {
        inputs : inputsValues,
        formIsValid : Initial_formState,
    });
    
    const inputChangeHandler = useCallback( (IDofInput , VALUEofInput , VALIDATIONofInput) =>
    {
        dispatch( {type : "INPUT_CHANGE" , id: IDofInput , inputValue: VALUEofInput , inputIsValid: VALIDATIONofInput})
    },[]);
    const setData = useCallback( (inputsvalues , Validform) =>
    {
        dispatch( {type : "SET_DATA"  , inputsValues: inputsvalues , ValidForm: Validform})
    },[]);

    return [formState , inputChangeHandler, setData]
}