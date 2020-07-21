import React from 'react';



const Content = ({onCreate}) => { 

    return(
        <>
            <div className="card w-100 mt-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Tikects</h3>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn btn-primary float-right" data-toggle="modal" data-target="#modal" > 
                                nuevo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Content;
    