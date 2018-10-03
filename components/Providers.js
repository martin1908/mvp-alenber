import React from 'react';

export const Providers  = (props) => {
	return (
		<div className="col-xs-12 cotnenedor-dete-pedido">
			<div className="col-xs-12">
				<div className="col-md-6 quitar-padding">
					<div className="col-xs-12 titulo-empresa-buscar quitar-padding">
						<h4>{props.enterprise.tradename}</h4>
						<p>{props.enterprise.address}</p>
					</div>
				</div>
				<div className="col-md-6 quitar-padding">
					<div className="col-xs-12 Estrella-empresa quitar-padding">
						<i className="fa fa-star"></i>
					</div>
				</div>
			</div>
			<div className="col-xs-12 quitar-padding">
				<div className="col-md-2 quitar-padding">
					<div className="col-xs-12 img-producto-empresa-buscar">
						<img src="/img/buscador/product.png" alt="" />
						<div className="col-xs-12 texto-producto-buscar-descrip">
								<h6>Motor electrico de induccion 2HP 1200 RPM 60 W con casco de adeco templado.</h6>
								<span>Código: 23456-x</span>
						</div>
					</div>
				</div>
				<div className="col-md-2 quitar-padding">
					<div className="col-xs-12 img-producto-empresa-buscar">
						<img src="/img/buscador/product.png" alt="" />
						<div className="col-xs-12 texto-producto-buscar-descrip">
							<h6>Motor electrico de induccion 2HP 1200 RPM 60 W con casco de adeco templado.</h6>
							<span>Código: 23456-x</span>
						</div>
					</div>
				</div>
				<div className="col-md-2 quitar-padding">
					<div className="col-xs-12 img-producto-empresa-buscar">
						<img src="/img/buscador/product.png" alt="" />
						<div className="col-xs-12 texto-producto-buscar-descrip">
							<h6>Motor electrico de induccion 2HP 1200 RPM 60 W con casco de adeco templado.</h6>
							<span>Código: 23456-x</span>
						</div>
					</div>
				</div>
				<div className="col-md-2 quitar-padding">
					<div className="col-xs-12 img-producto-empresa-buscar">
						<img src="/img/buscador/product.png" alt="" />
						<div className="col-xs-12 texto-producto-buscar-descrip">
							<h6>Motor electrico de induccion 2HP 1200 RPM 60 W con casco de adeco templado.</h6>
							<span>Código: 23456-x</span>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="col-xs-12 boton-enviar-cotiza">
						<a className="btn" href="">Ver Producto</a>
						<div className="numero-dueno-pro"><img src="/img/inicio/wp.png" alt="" />
							<h5>999 ********</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}