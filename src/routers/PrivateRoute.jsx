import React  from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

// Components
import { LoginScreen } from '../components/auth/LoginScreen';

export const PrivateRoute = ( { children, isValid } = {} ) => {
    return isValid
        ? children
        : <Navigate to='/auth/login' element={ < LoginScreen /> } />
}

PrivateRoute.propTypes = {
    isValid: PropTypes.bool.isRequired
}