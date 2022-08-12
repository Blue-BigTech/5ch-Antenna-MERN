import React from 'react';
import { Navigate } from 'react-router-dom';
import useCookies from '@react-smart/react-cookie-service';
import PropTypes from 'prop-types';
import { history } from './history';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { getCookie } = useCookies();
    let auth = getCookie('auth');

    if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.any,
};