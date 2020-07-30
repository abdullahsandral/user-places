import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from './Authentication/Signin-Form/LoginForm';
import SignUpForm from './Authentication/SignUp-Form/SignUpForm';
import Users from './Users/Pages/Users';
import NewPlaces from './Places/Pages/NewPlaces';
import UserPlaces from './Places/Pages/UserPlaces';
import UpdatePlace from './Places/Pages/UpdatePlace';
import PlaceDetail from './Places/Pages/PlaceDetail';
import MainNavigation from './Shared/Components/MainNvigation/MainNavigation';
import { AuthContext } from './Shared/Contexts/Authentication-Context';
import './App.css';

import MyDocument from './Shared/Components/PDF Viewer/PDFViewer';

let Timer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userImage, setUserImage] = useState('Users Places');
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const LOGIN = useCallback((uid, uImg, uTkn, tknDate) => {
    setToken(uTkn);
    setUserID(`${uid}`);
    setUserImage(uImg);
    const ExpirationDate = tknDate || new Date(new Date().getTime() + 1000 * 60 * 30);
    setTokenExpirationDate(ExpirationDate);
    localStorage.setItem('userData', JSON.stringify({ uId: uid, uImage: uImg, uToken: uTkn, TokenExpiryDate: ExpirationDate.toISOString() }));
  }, []);
  const LOGOUT = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null)
    setUserID(null);
    setUserImage('Users Places');
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      Timer = setTimeout(LOGOUT, remainingTime);
    }
    else clearTimeout(Timer)
  }, [token, tokenExpirationDate, LOGOUT])


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.uToken && new Date(storedData.TokenExpiryDate) > new Date()) {
      LOGIN(storedData.uId, storedData.uImage, storedData.uToken, new Date(storedData.TokenExpiryDate))
    }
  }, [LOGIN]);


  // const promiseCreator = time => {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {

  //       res('Promise Resolved : ' + time)
  //     }, time)

  //   })
  // }

  // (async () => {
  //   const time1 = await promiseCreator(1000)
  //   console.log(time1);
  //   const time2 = await promiseCreator(4000)
  //   console.log(time2);
  //   const time3 = await promiseCreator(5000)
  //   console.log(time3);
  //   const time4 = await promiseCreator(1000)
  //   console.log(time4);
  // })()



  var Routes;
  if (!token) {
    Routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/signup' exact>
          <SignUpForm />
        </Route>
        <Route path='/:uid/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/:pID/detail' exact>
          <PlaceDetail />
        </Route>

        <Redirect to='/login' />
      </Switch>
    )
  }
  else {
    Routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:uid/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlaces />
        </Route>
        <Route path='/places/:pID/update' exact>
          <UpdatePlace />
        </Route>
        <Route path='/places/:pID/detail' exact>
          <PlaceDetail />
        </Route>

        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={
      {
        loggedIn: !!token,
        userId: userID,
        userImage: userImage,
        userToken: token,
        login: LOGIN,
        logout: LOGOUT,
      }}>
      <Router>

        <MainNavigation />
        <main>
          {Routes}
          <div className='pdf'>
            <h4>Single Page</h4>
            <MyDocument />
          </div>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
