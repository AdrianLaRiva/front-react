import React, {useContext} from 'react';
import {AuthContext} from './../context/AuthContext';


const Header = () => { 

    const {logout} = useContext(AuthContext);
    const handlerLogout = () =>
    {
        logout();
    }
    return(
        <>
            <nav className="navbar navbar-expand-lgn avbar-dark bg-dark">
                <a className="navbar-brand" href="#">Tickets</a>
                <button  className="btn btn-sm btn-warning" onClick={handlerLogout}>Logout</button>
            </nav>
        </>
    )


}

export default Header;
    