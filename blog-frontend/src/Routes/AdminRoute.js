import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AdminRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
    />
);

AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
    };
}
export default connect(mapStateToProps)(AdminRoute);
