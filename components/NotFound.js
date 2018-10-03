import React from 'react';

export const NotFoundItem = (props) => (
  <div className="col-xs-12">
    <h4>
      Ups! No se encontraron {props.name}s
    </h4>
    <p>Parece que aún no tenemos este {props.name}, por favor busque otro</p>
  </div>
)