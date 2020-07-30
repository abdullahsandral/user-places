import {createContext} from 'react';

export const AuthContext = createContext(
    {
        loggedIn : false , 
        userId   : null,
        userImage : 'Users Places',
        userToken : null,
        login    : () => {},
        logout   : () => {},

    }
)