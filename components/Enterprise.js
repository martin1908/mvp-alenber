import React from 'react';

export const Enterprise = (props) => (
  <div className="col-md-7 texo-usaer">
    <p>Razon Social: 
    <span className="plus">{props.enterprise.businessName}</span>    
    </p>
    <h6>RUC: 
    <span className="plus">{props.enterprise.ruc}</span>  
    </h6>
    <h6>Página Web: 
    <span className="plus">{props.enterprise.webPage}</span>  
    </h6>
    <h6>Sector: 
    <span className="plus">{props.enterprise.sector}</span>  
    </h6>
    <h6>Dirección: 
    <span className="plus">{props.enterprise.address}</span>  
    </h6>
  </div>
)