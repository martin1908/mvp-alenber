import React from 'react';

export const Orders  = (props) => {
  return (
    <div className="col-xs-12 cotnenedor-dete-pedido">
      <br/>
      <div className="col-md-3 cotnendor-img-pedi">
        <div className="col-xs-12">
          <img className="img-fluid" src={props.order.photosOrden > 0 ? props.order.photosOrden[0] : ''} alt="" />
        </div>
        <br/>
      </div>
      <div className="col-md-6 titulo-pedido-bus">
        <h5>{props.order.title}</h5>
        <p>Solicitado por&nbsp;
          <span className="de-parte">{props.order.idCompany.tradename}</span>
          <span>&nbsp;Hace 5 horas</span>
        </p>
        <p className="items-caso">Items:
          <span>{props.order.IdItems[0].titleItem}</span>
          <a href="#">Leer m&aacute;s</a>
        </p>
        <div className="col-md-6 cantidad-padding">
          <p className="items-caso">Cantidad:
            <span>Por unidad</span>
          </p>
        </div>
        <div className="col-md-6 cantidad-padding">
          <p className="items-caso">Lugar de entrega:
            <span>{props.order.placeDelivery}</span>
          </p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="col-xs-12 boton-enviar-cotiza">
          <a href={'/perfil/pedidos/' + props.order._id + '/cotizaciones/crear'}>Enviar Cotizaci&oacute;n</a>
          <p>Cotizaciones
            <span> recibidas: </span>
            <span className="numero-reci">{props.order.idQuotation.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}