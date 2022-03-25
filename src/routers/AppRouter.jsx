import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';

// Firebase
import { firebase } from '../firebase/firebase-config';

// Routes
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';

// Actions
import { login } from '../actions/auth';

// Components
import { JournalScreen } from '../components/journal/JournalScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState( true );
    const [isLoggedIn, setIsLoggedIn] = useState( false );

    useEffect(() => {
        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
            }

            setIsLoggedIn( !!user?.uid );
            setCheking( false );
        });
    }, [ dispatch, setCheking, setIsLoggedIn ])

    if( cheking ){
        return(
            <h1>Identificando...</h1>
        );
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/*' element={
                        <PublicRoute isValid={isLoggedIn} >
                            <AuthRouter />
                        </PublicRoute >
                    }
                />
                <Route path='/' element={
                        <PrivateRoute isValid={isLoggedIn} >
                            <JournalScreen />
                        </PrivateRoute >
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

       {/* <Route element={
                    <PublicRoute
                        path='/auth/*'
                        element={ AuthRouter }
                        // isAuthenticated={ isLoggedIn }
                    />}/>
                <Route path='/' element={
                    <PrivateRoute 
                        path='/'
                        element={ JournalScreen }
                        // isAuthenticated={ isLoggedIn }
                    />}/> */}