import React  from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

// Routers
import { AuthRouter } from './AuthRouter';

export const PublicRoute = ( { children, isValid } = {} ) => {
    return isValid
        ? <Navigate to='/' element={ < AuthRouter /> } />
        : children
}

PublicRoute.propTypes = {
    isValid: PropTypes.bool.isRequired
}