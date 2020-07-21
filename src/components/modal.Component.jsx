import React, {useState, useEffect, useContext} from 'react';
import {API_BASE_URL} from './../constants/index';
import {AuthContext} from './../context/AuthContext';
import axios from 'axios';

const Modal = ({onAddCotizacion}) => { 
    const {user} = useContext(AuthContext);
    

    const [state , setState] = useState({
        cliente : "",
        region : "",
        comuna:"",
        concepto: "",
        persona_contacto: "",
        email_contacto: "",
        total: "",

    })

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [errorForm , setErrorForm] = useState(true)

    useEffect(() => {
        const url =  `${API_BASE_URL}/cotizaciones/create`;
        axios.get(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': user.api_token
            },
            data:{},
        }).then(resp =>{
           setRegiones(resp.data)
        }).catch(error => {
          
            console.log(error)
        });
    },[]);

    const handleGetComunas = (event) =>
    {   
        const {value, name} = event.target;
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))

        const id = event.target.value;
        const url =  `${API_BASE_URL}/getComunas/${id}`;
        axios.get(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': user.api_token
            },
            data:{},
        }).then(resp =>{

        setComunas(resp.data.comunas)
        }).catch(error => {
        
            console.log(error)
        });
    }

    const handleChange = (event) =>
    {
        const {value, name} = event.target;
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))
         validaElement(event.target,name,value);
    }
    const handleClearform = () =>
    {
        document.getElementById("form_nuevo").reset();
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(errorForm === false 
            && document.getElementById("cliente").value !== "" 
            && document.getElementById("region").value !== "" 
            && document.getElementById("comuna").value !== "" 
            && document.getElementById("concepto").value !== "" 
            && document.getElementById("persona_contacto").value !== "" 
            && document.getElementById("total").value !== "" 
            && document.getElementById("email_contacto").value !== "")
 
        {   
            const url =  `${API_BASE_URL}/cotizaciones/store/store`;   

           axios({method: 'post',
            url: url, 
            headers: {
                'Authorization': user.api_token,
                'Content-Type': 'application/json'
            },
            data: state
            }).then(resp =>{
               onAddCotizacion(resp.data.cotizacion);
               setState({ cliente : "",
                region : "",
                comuna:"",
                concepto: "",
                persona_contacto: "",
                email_contacto: "",
                total: "",})
                handleClearform();
                closeModal();
            }).catch(error => {
            
                console.log(error)
            });
        }else{
            alert("todos los campos son obligatorios");
        }

    }
   
    const validaElement = (element,name,value) =>{
        if(name === "email_contacto")
        {
            if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)) {
                element.parentNode.querySelector('.error').classList.add("d-none");
                setErrorForm(false);
                return true;
            }
            setErrorForm(true);
            element.parentNode.querySelector('.error').classList.remove("d-none");
        }
    }

    const closeModal = () => {
        document.querySelector("#closemodal").click();
      }


    return(
        <div className="modal fade" id="modal"  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Crear Nuevo</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form className="p-3" id="form_nuevo">
                    <div className="form-group text-left">
                        <label htmlFor="">Cliente</label>
                        <input type="text" 
                            className="form-control" 
                            id="cliente" 
                            name="cliente"
                            placeholder="Enter cliente"
                            onChange={handleChange}   
                        />
                        <div className="error d-none">
                            <span className="text-danger">cliente invalido (minmo 1 caracteres)</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="">Region</label>
                        <select className="form-control" defaultValue={""} title="Region" id="region" name="region" onChange={handleGetComunas}   >
                              
                                    <option  value="" disabled>Seleccione</option>
                                    {
                                    (regiones.length) ?
                                        regiones.map((value,index) =>(
                                            <option key={value.id} value={value.id}>{value.nombre}</option>
                                        ))
                                        :
                                    ""
                                    }            
                                
                        </select>  
                        <div className="error d-none">
                            <span className="text-danger">region invalida</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="">Comuna</label>
                        <select className="form-control"  defaultValue={""} id="comuna" name="comuna" onChange={handleChange}> 
                                <option  value="" disabled>Seleccione</option>
                                {
                                    (comunas.length) ?
                                        comunas.map((value,index) =>(
                                            <option key={value.id} value={value.id}>{value.nombre}</option>
                                        ))
                                        :
                                    ""
                                            
                                }
                        </select>  
                        <div className="error d-none">
                            <span className="text-danger">comuna invalida</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="">Concepto</label>
                        <input type="text" 
                            className="form-control" 
                            id="concepto" 
                            name="concepto"
                            placeholder="Enter concepto"
                            onChange={handleChange}   
                        />
                        <div className="error d-none">
                            <span className="text-danger">Concepto invalido (minimo 1 caracter)</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="">Persona contacto</label>
                        <input type="text" 
                            className="form-control" 
                            id="persona_contacto" 
                            name="persona_contacto"
                            placeholder="Enter contacto"
                            onChange={handleChange}   
                        />
                        <div className="error d-none">
                            <span className="text-danger">Persona contacto (minimo 1 caracter)</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="">Email contacto</label>
                        <input type="text" 
                            className="form-control" 
                            id="email_contacto" 
                            name="email_contacto"
                            placeholder="Enter contacto"
                            onChange={handleChange}   
                        />
                        <div className="error d-none">
                            <span className="text-danger">Email contacto invalido</span>   
                        </div>
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">total</label>
                        <input type="number" 
                            className="form-control" 
                            id="total" 
                            name="total"
                            placeholder="5000"
                            onChange={handleChange}
                        />
                        <div className="error d-none">
                            <span className="text-danger">total invalido (minimo 1 caracter)</span>   
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="closemodal" className="btn btn-secondary" onClick ={handleClearform} data-dismiss="modal">Cerar</button>
                        <button type="button" className="btn btn-primary" onClick = {handleSubmitClick}>Guardar</button>
                    </div>
                </form>
                </div>
                
                </div>
            </div>
        </div>
    );

}

export default Modal;