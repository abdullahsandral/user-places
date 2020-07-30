const initialState = {
    allUsers : [],
    allPlaces : [],
    usersFetched : false,
    placesFetched : false,
}

const reducer = (state = initialState, action)  =>
{   
    switch(action.type)
    {
        case 'USERS_FETCHED' :
        return{
            ...state,
            allUsers: action.value,
            usersFetched : true
        }
        case 'PLACES_FETCHED' :
        return{
            ...state,
            allPlaces: action.value,
            placesFetched : true,
        }
        case 'SIGN_UP' :
        return{
            ...state,
            usersFetched : false
        }
        case 'NEW_PLACE_ADDED':
        return{
            ...state,
            usersFetched : false,
            placesFetched : false,
        }
        case 'PLACE_DELETED':
        return{
            ...state,
            usersFetched : false,
            placesFetched : false,
        }
        case 'PLACE_UPDATED':
        return{
            ...state,
            placesFetched : false,
        }
        default:
        return state
    }
   
}

export default reducer; 