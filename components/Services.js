import React from 'react';

export const Services  = (props) => {
  return (
    <div className="col-xs-12 cotnenedor-dete-pedido">
      <br/>
      <div className="col-md-3 cotnendor-img-pedi">
        <div className="col-xs-12">
          <img className="img-fluid" src="https://www.toucanian.com/img/avatar/phpW7HOX1_58019b45e9ab7.jpg" alt="" />
        </div>
        <br/>
      </div>
      <div className="col-md-6 titulo-pedido-bus">
        <h5>Servicio 1</h5>
        <br/>
        <p className="items-caso">
          <span> 
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed alias eos, maxime eveniet mollitia tempora nobis sequi.
          </span>
        </p>
        <br/>
        <span className="de-parte">
          Empresa Proveedora de Maquinarias S.A
        </span>
        <div className="col-md-12 cantidad-padding">
          <p className="items-caso">
            <span> Santa Rosa</span>
          </p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="col-xs-12 boton-enviar-cotiza">
          <a className="btn" href="">Ver Producto</a>
          <div className="numero-dueno-pro">
            <img src="/img/inicio/wp.png" alt="" />
            <h5>999 ********</h5>
          </div>
        </div>
      </div>
    </div>
  )
}