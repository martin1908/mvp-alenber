import React from 'react';
import { render } from 'react-dom';
import { Providers } from './Providers';
import { Products } from './Products';
import { Services } from './Services';
import { Orders } from './Orders';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Pagination } from './Pagination';
import { NotFoundItem } from './NotFound';
import axios from 'axios';

const base = 'https://alenber.herokuapp.com/api';

class SearchPrincipal extends React.Component{
  state = {
		products: [],
		services: [],
		enterprises: [],
		orders: [],
		pages: 0,
		page: 0,
		limit: 10,
		search: '',
		allItems: [],
		items: [],
		type: 0,
		regions: []
	}

  componentWillMount(){
		let type = null;
		const location = window.location.pathname;
		const search = window.location.search && window.location.search != "" ? window.location.search.split('?s=')[1] : '';
		let products;
		let orders;
		let enterprises;
		let services;
		let ubigeo;
		location.includes('/buscar/productos') && (type = 1);
		location.includes('/buscar/servicios') && (type = 2);
		location.includes('/buscar/proveedores') && (type = 3);
		location.includes('/buscar/pedidos') && (type = 4);
		let allItems = [];
		Promise.all(
			[
				axios.get(base + '/search/products').then((res) => products = res.data.allProducts).catch((err) => console.log(err)),
				axios.get(base + '/search/enterprises').then((res) => enterprises = res.data.allEnterprises).catch((err) => console.log(err)),
				axios.get(base + '/search/orders').then((res) => orders = res.data.allOrders).catch((err) => console.log(err)),
				axios.get(base + '/search/services').then((res) => services = res.data.allServices).catch((err) => console.log(err)),
				axios.get(base + '/ubigeo').then(res => ubigeo = res.data.foundUbigeo).catch(err => console.log(err))
			]
		)
		.then(() => {
			const regions = ubigeo.filter((u) => u.departamento != "00" && u.provincia == "00" && u.distrito == "00");
      const provinces = ubigeo.filter((u) => u.departamentos != "00" && u.provincia != "00" && u.distrito == "00");
			const districts = ubigeo.filter((u) => u.departamentos != "00" && u.provincia != "00" && u.distrito != "00");
			provinces.map((p) => {
				p.districts = districts.filter((d) => d.departamento == p.departamento && d.provincia == p.provincia);
			})

			regions.map((r) => {
				r.provinces = provinces.filter((p) => p.departamento == r.departamento)
			})

			console.log(regions)
			
			!products && (products = []);
			!services && (services = []);
			!orders && (orders = []);
			!enterprises && (enterprises = []);

			const limit = this.state.limit;

			if(type == 1){
				allItems = products.filter((t) => t.name && t.name.toLowerCase().includes(search.toLowerCase()));
			}else if(type == 2){
				allItems = services.filter((t) => t.tradename && t.tradename.toLowerCase().includes(search.toLowerCase()));
			}else if(type == 3){
				allItems = enterprises.filter((t) => t.tradename && t.tradename.toLowerCase().includes(search.toLowerCase()))
			}else if(type == 4){
				allItems = orders.filter((t) => t.title && t.title.toLowerCase().includes(search.toLowerCase()))
			}

			const pages = Math.ceil(allItems.length/limit)
			const page = pages >= 1 ? 1 : 0;
			const items = allItems.slice((page-1) * limit, limit * page);
			this.setState({ products, enterprises, allItems, page, pages, items, search, type, orders, services, regions });
		})
		.catch((err => console.log(err)))
	}
	
	previousPage = () => {
    if(this.state.page !== 1 && this.state.page !== 0){
      const page = this.state.page - 1;
      const limit = this.state.limit;
      const items = this.state.allItems.slice((page-1) * limit, limit * page);
      this.setState({ page, items });
    }
  }

  nextPage = () => {
    if(this.state.page !== this.state.pages){
      const page = this.state.page + 1;
      const limit = this.state.limit;
      const items = this.state.allItems.slice((page-1) * limit, limit * page);
      this.setState({ page, items });
    }
  }

  goPage = (e) => {
    const target = e.target.tagName === "A" ? e.target.parentElement : e.target;
    const page = parseInt(target.getAttribute("data-page"));
    if(page != "..." && page > 0 && page !== this.state.page && page <= this.state.pages){
      const limit = this.state.limit;
      const items = this.state.allItems.slice((page-1) * limit, limit * page);
      this.setState({ page, items });
    }
  }

  handleChangeView = (e) => {
    const value = e.target.getAttribute('data-type');
    const page = 1;
    const limit = this.state.limit;
    let allItems = null;
    if(value == 1){
      allItems = this.state.products.filter((t) => t.name && t.name.toLowerCase().includes(this.state.search.toLowerCase()));
    }else if(value == 2){
      allItems = this.state.services.filter((t) => t.tradename && t.tradename.toLowerCase().includes(this.state.search.toLowerCase()));
    }else if(value == 3){
      allItems = this.state.enterprises.filter((t) => t.tradename && t.tradename.toLowerCase().includes(this.state.search.toLowerCase()))
    }else if(value == 4){
			allItems = this.state.orders.filter((t) => t.title && t.title.toLowerCase().includes(this.state.search.toLowerCase()))
		}
    const items = allItems.slice((page-1) * limit, limit * page);
    const pages = Math.ceil(allItems.length/limit)
    this.setState({ items, page, pages, allItems, type: value })
  }

  handleSearch = (e) => {
    const value = e.target.value;
    const type = this.state.type;
    const page = 1;
    const limit = this.state.limit;
    let allItems = null;
    if(type == 1){
      allItems = this.state.products.filter((t) => t.name && t.name.toLowerCase().includes(value.toLowerCase()));
    }else if(type == 2){
      allItems = this.state.services.filter((t) => t.tradename && t.tradename.toLowerCase().includes(value.toLowerCase()));
    }else if(type == 3){
      allItems = this.state.enterprises.filter((t) => t.tradename && t.tradename.toLowerCase().includes(value.toLowerCase()))
    }else if(type == 4){
			allItems = this.state.orders.filter((t) => t.title && t.title.toLowerCase().includes(value.toLowerCase()))
		}
    const pages = Math.ceil(allItems.length / limit)
    const items = allItems.slice((page-1) * limit, limit * page);
    this.setState({ page, items, search: value, pages, allItems })

  }

  render(){
    return (
      <Router>
				<div className="col-xs-12 sinpa">
					<div className="col-sm-3 hidden-xs sinpa home-2-buscar-pedidos-content">
						<div className="col-xs-12 sinpa home-2-1">
							<h4>CATEGORÍAS</h4>
							<h5>SECTOR</h5>
							<ul>
									<li> <a href="#">Minero(354)</a></li>
									<li><a href="#">Minero(354)</a>
											<ul>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
											</ul>
									</li>
									<li><a href="#">Minero(354)</a>
											<ul>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
											</ul>
									</li>
									<li><a href="#">Minero(354)</a>
											<ul>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
													<li><a href="#">Minero(354)</a></li>
											</ul>
									</li>
							</ul>
							<h5>LUGAR</h5>
							<ul>
								{
									this.state.regions && this.state.regions.map((r, k) => (
										<li key={k}>
											{r.nombre}
											<ul>
												{r.provinces && r.provinces.map((p, j) => <li key={j}>
													{p.nombre}
													<ul>
														{
															p.districts && p.districts.map((d, n) => <li key={n}>{d.nombre}</li>)
														}
													</ul>
												</li>)}
											</ul>
										</li>
									))
								}
							</ul>
						</div>
						<div className="col-xs-12 publicidad">
							<img className="img-responsive" src="img/inicio/publi2.png" alt="" />
						</div>
						<div className="col-xs-12 publicidad">
							<img className="img-responsive" src="img/inicio/publi2.png" alt="" />
						</div>
						<div class="col-xs-12 publicidad">
							<img className="img-responsive" src="img/inicio/publi2.png" alt="" />
						</div>
					</div>
					<div className="col-sm-9 hidden-xs sinpa home-2-buscar-pedidos-content">
						<div className="col-xs-12 hidden-xs">
							<div className="col-xs-12 sinpa searching">
								<div className="input-group search-bar">
										<input className="form-control" type="text" placeholder="Digite su busqueda" value={this.state.search} onInput={this.handleSearch}/>
								</div>
							</div>
						</div>
						<div className="col-xs-12 sinpa tba">
							<div className="col-xs-12">
								<Link className={`btn-searching boton-produc tablink ${this.state.type == 1 && 'active'}`} to="/buscar/productos" data-type="1" onClick={this.handleChangeView}>Productos</Link>
								<Link className={`btn-searching tablink boton-servi ${this.state.type == 2 && 'active'}`} to="/buscar/servicios" data-type="2" onClick={this.handleChangeView}>Servicios</Link>
								<Link className={`btn-searching tablink boton-provee ${this.state.type == 3 && ' active'}`} to="/buscar/proveedores" data-type="3" onClick={this.handleChangeView}>Proveedores</Link>
								<Link className={`btn-searching tablink boton-pedi ${this.state.type == 4 && 'active'}`} to="/buscar/pedidos" data-type="4" onClick={this.handleChangeView}>Pedido</Link>
								<div id="pedido">
									<div className="col-xs-12 contenedor-principal-pedido" >
										{
											this.state.items && this.state.items != 0 ?
											<Switch>
												<Route path='/buscar/pedidos' exact component = { () => this.state.items.map((p, k) => <Orders key={k} order={p} />) }/>
												<Route path='/buscar/servicios' exact component = { () => this.state.items.map((p, k) => <Services key={k} service={p} />) }/>
												<Route path='/buscar/productos' exact component = { () => this.state.items.map((p, k) => <Products key={k} product={p} />)}/>
												<Route path='/buscar/proveedores' exact component = { () => this.state.items.map( (i,k) => <Providers enterprise={i} key={k}/>) }/>
											</Switch>
											: <NotFoundItem name={ this.state.type == 1 ? 'producto' : this.state.type == 2 ? 'servicio' : this.state.type == 3 ? 'empresa' : 'pedido'}/>
										}
									</div>
									<Pagination goPage={this.goPage} previousPage={this.previousPage} nextPage={this.nextPage} pages={this.state.pages} page={this.state.page}/>
								</div>
							</div>
						</div>
					</div>
				</div>
      </Router>
    )
  }
}

const searchPrincipal = document.getElementById('search-principal');
searchPrincipal && render(<SearchPrincipal/>, searchPrincipal);