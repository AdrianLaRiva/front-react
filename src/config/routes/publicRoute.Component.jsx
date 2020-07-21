import React,  {useContext}  from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from './../../context/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) =>{
    
    const {isAuth} = useContext(AuthContext);
    
        return (
            <Route
                {...rest}
                render={props =>
                    !isAuth() ? <Component {...props} /> : <Redirect to="/cotizaciones" />
                }
            />
        );
    
}
export default PublicRoute;