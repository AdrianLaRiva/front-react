import React, {createContext, useState,useEffect} from 'react';
import axios from 'axios';
import {loginApi} from './../constants';
import {logoutApi} from './../constants';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || JSON.parse(false)
    );
       
    useEffect(() => {
        sessionStorage.setItem("user",  JSON.stringify(user));
        }, [user]);
 

    const isAuth = () => {
        if(user === false)
            return false;

        return true;
    }
    const login = (user_login) => {
        axios.post(loginApi(),{
            headers:{
              'Content-Type': 'application/json',
              'Authorization': ""
          },
            data:{email: user_login.email,
                password: user_login.password  
                },
        }).then(resp =>{
            setUser(resp.data);
        }).catch(error => {
            console.log(error)
        });
    }

    const logout = () => {
        const url = logoutApi();
        axios({method: 'post',
        url: url, 
        headers: {
            'Authorization': user.api_token,
            'Content-Type': 'application/json'
        },
        data: {}
        }).then(resp =>{
            setUser(false);
        }).catch(error => {
            console.log(error)
        });


    }

    return (
        <AuthContext.Provider value={{user, isAuth, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;