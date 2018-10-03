import React from 'react';
import moment from 'moment';

const getQuantity = (items) => {
  let quantity = 0;
  items && items.map(i => quantity += i.quantity);
  return quantity;
};

export const ProfileQuotation = (props) => (
  <div className="col-xs-12 order-item">
    <div className="col-sm-2">
      <img className="img-fluid img-pedidos-perfil-enviar-cotiza" src="http://www.pragmaxion.com/wp-content/uploads/2014/01/logoAntaminaP.png" alt="" />
    </div>
    <div className="col-sm-7 col-xs-12 order-item-1"><br/>
      <h5>{props.quotation.idOrder.title}</h5>
      <p>Pedido de <span className="nombre-compania">{props.quotation.idOrder.idCompany.tradename}</span></p>
      <p>Precio: <span>{props.quotation.totalAmount}</span></p>
      <p>Cantidad:<span>{getQuantity(props.quotation.idItemQuotation)}</span></p>
      <p>Fecha de entregga:<span>{moment(props.quotation.dateDelivery).format('DD/MM/YYYY')}</span></p>
      <p>Fecha de cotización:<span>{moment(props.quotation.createdAt).format('DD/MM/YYYY')}</span></p>
      <img src="/img/UP-Pagar subscripción/link (1).png" alt="" />
      <span className="descargar-orders-comprar">Descarga la orden de compra: </span>
      <a className="codigo-donwoloand-cotiza" href="">ZTU-AU-COT.pdf</a></div>
    <div className="col-sm-3 col-xs-12 order-item-2">
      <center><a className="btn visualizar-boton" href={"/perfil/cotizaciones/" + props.quotation._id}>Visualizar</a></center>
    </div>
  </div>
)