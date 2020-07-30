const REQUIRE_VALIDATOR_TYPE    = "REQUIRE";
const MIN_LENGTH_VALIDATOR_TYPE = "MIN_LENGTH";
const MAX_LENGTH_VALIDATOR_TYPE = "MAX_LENGTH";
const EMAIL_VALIDATOR_TYPE      = "EMAIL";
// const FILE_VALIDATOR_TYPE    = "FILE";

export  const REQUIRE_VALIDATOR     = ()    =>    ({   type:   REQUIRE_VALIDATOR_TYPE  });
export  const MIN_LENGTH_VALIDATOR  = v     =>    ({   type:   MIN_LENGTH_VALIDATOR_TYPE ,  value: v});
export  const MAX_LENGTH_VALIDATOR  = v     =>    ({   type:   MAX_LENGTH_VALIDATOR_TYPE ,  value: v});
export  const EMAIL_VALIDATOR       = ()    =>    ({   type:   EMAIL_VALIDATOR_TYPE });

export const validator = (value , valiadtors) =>
{
    let isValid = true;
    if(valiadtors)
    {
        for(let oneValidator of valiadtors)
        {   
            if(oneValidator.type === REQUIRE_VALIDATOR_TYPE)
            {isValid =  isValid && value.trim().length > 0;}
            
            if(oneValidator.type === MIN_LENGTH_VALIDATOR_TYPE)
            {isValid =  isValid &&  value.trim().length >= oneValidator.value;}
            
            if(oneValidator.type === MAX_LENGTH_VALIDATOR_TYPE)
            {isValid =  isValid &&  value.trim().length <=oneValidator.value;}
            
            if(oneValidator.type === EMAIL_VALIDATOR_TYPE) 
            {isValid =  isValid && /^\S+@\S+\.\S+$/.test(value);}
        }
    }
   return isValid
}