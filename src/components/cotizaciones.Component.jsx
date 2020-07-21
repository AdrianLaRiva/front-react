import React, {useContext,useMemo} from 'react';
import axios from 'axios';
import {API_BASE_URL} from './../constants/index';
import {AuthContext} from './../context/AuthContext';
import DataTable from 'react-data-table-component';

const Cotizaciones = ({cotizaciones, onShow, onDeleteCotizacion}) => { 

    const {user} = useContext(AuthContext);
    
    const handleDelete= event => {
        let id = event.target.closest(".rdt_TableRow").id.split("-")[1];
        const url =  `${API_BASE_URL}/cotizaciones/${id}`;
        axios.delete(url,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': user.api_token
                },
                data:{},
            }).then(resp =>{
                onDeleteCotizacion(id);
              
            }).catch(error => {
                console.log(error)
        });

    };

    const handleShow = event => {
        let id = event.target.closest(".rdt_TableRow").id.split("-")[1];
        onShow(id);
    }

      const columns = useMemo(() => [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Cliente',
                selector: 'cliente',
                sortable: true,
            },
            {
                name: 'Copncepto',
                selector: 'concepto',
                sortable: true,
            },
            {
                name: 'Comuna',
                selector: 'comuna.nombre',
                sortable: true,
            },
            {
              name: 'Total',
              selector: 'total',
              sortable: true,
            },
            {
                name: 'Editar',
                cell: () => <button className="btn btn-success btn-sm"  key = {cotizaciones.id} onClick={handleShow} data-toggle="modal" data-target="#modalVer">Ver</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
            {   
                name: 'Eliminar',
                cell: () => <button  className="btn btn-danger btn-sm" onClick={handleDelete}>Eliminar</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },

      ]);
    
    return(
        <>
            <div className="card w-100 mt-3">
                <div className="card-body">
                    <div className="row">
                        
                        <DataTable
                            title="Listado de tickets"
                            columns={columns}
                            data={cotizaciones}
                            pagination={true}
                        />
                        
                    </div>
                </div>
             </div>
        </>
    )


}

export default Cotizaciones;
    