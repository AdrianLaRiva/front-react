import React,{useContext,useState} from 'react';
import {AuthContext} from './../context/AuthContext';
import { Redirect } from 'react-router';

const LoginForm = () => {
    
    const {login, isAuth} = useContext(AuthContext);
    const [state , setState] = useState({
        email : "",
        password : ""
    })
    const [errorForm , setErrorForm] = useState(true)

    if(isAuth())
    {
        return <Redirect to='/cotizaciones' />
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))
        validaForm(event.target,name,value);
       
    };

    const validaForm = (element,name,value) =>{
        if(name === "email")
        {
            if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)) {
                element.parentNode.querySelector('.error').classList.add("d-none");
                setErrorForm(false);
                return true;
            }
            setErrorForm(true);
            element.parentNode.querySelector('.error').classList.remove("d-none");
        }
        if (name === "password")
        {
            if(value.length >= 6)
            {   
                element.parentNode.querySelector('.error').classList.add("d-none");
                setErrorForm(false);
                return true;
            }
            setErrorForm(true);
            element.parentNode.querySelector('.error').classList.remove("d-none");
        }
    }


    const handleSubmitClick = (e) => {
        e.preventDefault();
       if(errorForm === false)
       {   
           login(state);
       }
    }

    return(
        <div className="container d-flex align-items-center flex-column mt-5">
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form className="p-3">
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        onChange={handleChange}
                        />
                        <div className="error d-none">
                            <span className="text-danger">Email invalido</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            placeholder="Password"
                            onChange={handleChange} 
                        />
                        <div className="error d-none">
                            <span className="text-danger">Password invalido</span>   
                        </div>
                    </div>
                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-primary center"
                            onClick={handleSubmitClick}
                        >
                            Go!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
    