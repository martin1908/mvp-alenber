import React from 'react';

export const User = (props) => (
  <div className="col-md-7 texo-usaer">
    <h3>{props.user.name} {props.user.surname}</h3>
    {
      props.user.company && 
      (<p>Empresa: 
        <span>{props.user.company.tradename}</span>
      </p>)
    }
    <h6>Usuario: 
      <span className="plus">{props.user.premium}</span>
    </h6>
    <h6>Correo: 
      <span className="correos">{props.user.email}</span>
    </h6>
    <h6>Fecha de Registro: 
      <span className="correos"> {props.user.createdAt}</span>
    </h6>
  </div>
)