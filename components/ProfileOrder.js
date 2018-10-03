import React from 'react';
import moment from 'moment';

moment.locale('es');

const getQuantity = (items) => {
  let quantity = 0;
  items.map(i => quantity += i.quantity);
  return quantity;
};

const getPublishTime = (date) => {
  let time = Math.ceil((Date.now() - new Date(date))/1000);
  if(time > (24 * 3600)) return <p>Publicado el <span>{moment(date).format('DD/MM/YYYY')}</span></p>
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  time %= 60;
  const seconds = time;
  let msg;
  if(hours != 0){
    msg = hours + ' ' + (hours == 1 ? 'hora' : 'horas');
  }else if(minutes != 0){
    msg = minutes + ' ' + (minutes == 1 ? 'minuto' : 'minutos')
  }else if(seconds != 0){
    msg = seconds + ' ' + (seconds == 1 ? 'segundo' : 'segundos')
  }
  return <p>Publicado hace <span>{msg}</span></p>
}

export const ProfileOrder = (props) => (
  <div className="col-xs-12 order-item">
    <div className="col-sm-2">
      <img className="img-fluid img-pedidos-perfil-enviar-cotiza" src="http://www.pragmaxion.com/wp-content/uploads/2014/01/logoAntaminaP.png" alt="" />
    </div>
    <div className="col-sm-7 col-xs-12 order-item-1"><br/>
      <h5>{props.order.title}</h5>
      {getPublishTime(props.order.createdAt)}
      <p>{props.order.moreDescription}<a className="color-azul" href={'/perfil/pedidos/'+props.order._id}>ver requerimiento</a></p>
      <div className="col-xs-12 cantidad-tres-entrega">
          <p>Cantidad:<span>{ getQuantity(props.order.IdItems) } Unidades</span></p>
          <p>Lugar de entrega:<span>{props.order.placeDelivery}</span></p>
          <p>Fecha de entrega:<span>{moment(props.order.dateDelivery).format('DD/MM/YYYY')}</span></p>
      </div>
    </div>
    <div className="col-sm-3 col-xs-12 order-item-2">
      <center>
        <a className="btn visualizar-boton" href={'/perfil/pedidos/cotizaciones/'+props.order._id}>
          Ver cotizaciones
          <span>6</span>
        </a>
      </center>
    </div>
</div>
)