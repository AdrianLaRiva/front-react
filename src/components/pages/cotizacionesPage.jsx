import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {API_BASE_URL} from './../../constants/index';
import {AuthContext} from './../../context/AuthContext';
import Header from './../header.Component';
import Content from '../content.Component';
import Modal from '../modal.Component';
import ModalVer from '../modalVer.Component';
import Cotizaciones from './../cotizaciones.Component';
 


const CotizacionesPage = () =>{

    const {user} = useContext(AuthContext);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [currentCot, setCurrentCot] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url =  `${API_BASE_URL}/cotizaciones`;
        axios.get(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': user.api_token
            },
            data:{},
        }).then(resp =>{
            setLoading(false);
            setCotizaciones(resp.data)
        }).catch(error => {
            setLoading(false);
            console.log(error)
        });
    },[]);

    const handleDeleteCotizacion = (id) => {

        const new_cotizaciones = cotizaciones.filter(cotizacion => parseInt(cotizacion.id) !== parseInt(id));
        setCotizaciones(new_cotizaciones);
    }

    const handleAddCotizacion = (cotizacion) => {

        setCotizaciones(prevState =>[cotizacion,...prevState]);
    }

    const handleShow = (cotizacion) => {

        const url =  `${API_BASE_URL}/cotizaciones/${cotizacion}`;
        axios.get(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': user.api_token
            },
            data:{},
        }).then(resp =>{
            setCurrentCot(resp.data);
        }).catch(error => {
            console.log(error)
        });
    }


    return(
        <>
            <Header />
            {
                (loading) ?
                    <p>Cargando</p>
                :
                
                <div className="container">
                    <Content />
                    <Cotizaciones cotizaciones = {cotizaciones} onShow ={handleShow} onDeleteCotizacion = {handleDeleteCotizacion} />
                    <Modal onAddCotizacion = {handleAddCotizacion} />
                    <ModalVer cotizacion = {currentCot} />
                </div>
            }
            
        </>
       
    )


}

export default CotizacionesPage;