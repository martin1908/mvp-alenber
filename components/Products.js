import React from 'react';

export const Products  = (props) => {
  const attributes = props.product && props.product.attribute ? props.product.attribute.map((a, k) => {
    return { attribute: a, value: props.product.value[k] }
  }) : [];
  return (
    <div className="col-xs-12 cotnenedor-dete-pedido">
      <br/>
      <div className="col-md-3 cotnendor-img-pedi">
        <div className="col-xs-12">
          <img className="img-fluid" src={props.product.mainPhoto} alt="" />
        </div>
        <br/>
      </div>
      <div className="col-md-6 titulo-pedido-bus">
        <h5>{props.product.name}</h5>
        {
          attributes.map((a,k) => (
            <div className="col-xs-12 cantidad-padding" key={k}>
              <p className="items-caso">
                {a.attribute}:
                <span> {a.value}</span>
              </p>
            </div>
          ))
        }
        <span className="de-parte">
          {props.product.idCompany.tradename}
        </span>
        {
          props.product.idUserProveedor.premium == 1 && (
            <div className="col-md-12 icono-start">
              <i className="fa fa-star"></i>
              <p>PROVEEDOR PREMIUM</p>
            </div>
          )
        }
        <div className="col-md-12 cantidad-padding">
          <p className="items-caso">
            <span>Santa Rosa</span>
          </p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="col-xs-12 boton-enviar-cotiza">
          <a className="btn" href="">Ver Producto</a>
          <div className="numero-dueno-pro">
            <img src="/img/inicio/wp.png" alt="" />
            <h5>{props.product.idUserProveedor.phone}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}