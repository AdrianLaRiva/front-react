import React, { useContext } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from './../../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) =>{
    const {isAuth} = useContext(AuthContext);
    return (
      <Route
          {...rest}
          render={props =>
              isAuth() ? <Component {...props} /> : <Redirect to="/" />
          }
      />
 	);
}
export default PrivateRoute;