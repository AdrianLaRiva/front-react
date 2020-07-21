import React from 'react';

const ModalVer = ({cotizacion}) => { 
    return(
        <div className="modal fade" id="modalVer"  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Ver </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li>Cliente : {(cotizacion) ? cotizacion.cliente : "" }</li>
                            <li>Region : {(cotizacion) ? cotizacion.region.nombre : "" }</li>
                            <li>Comuna : {(cotizacion) ? cotizacion.comuna.nombre : "" }</li>
                            <li>Concepto : {(cotizacion) ? cotizacion.concepto : "" }</li>
                            <li>Persona Contacto : {(cotizacion) ? cotizacion.persona_contacto : "" }</li>
                            <li>Email Contacto : {(cotizacion) ? cotizacion.email_contacto : "" }</li>
                            <li>Total : {(cotizacion) ? cotizacion.total : "" }</li>
                            <li>Estado : {(cotizacion) ? cotizacion.estado.nombre : "" }</li>
                        </ul>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerar</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ModalVer;