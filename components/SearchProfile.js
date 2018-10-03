import React from 'react';
import { render } from 'react-dom';
import { ProfileOrder } from './ProfileOrder';
import { ProfileQuotation } from './ProfileQuotation';
import { NotFoundItem } from './NotFound';
import { Pagination } from './Pagination';
import axios from 'axios';

const base = 'https://alenber.herokuapp.com/api/';

class SearchProfile extends React.Component{
  state = {
		pages: 0,
		page: 0,
		limit: 10,
		search: '',
		allItems: [],
		items: [],
		type: 0,
		filterItems: [],
		select: 1
	}

  componentWillMount(){
		const authorization = document.getElementById('authorization');
		const token = authorization.getAttribute('data-token');
		const { route } = this.props;
		let type ;
		axios.get(base + route, { headers: { 'authorization': 'Bearer ' + token } })
		.then((res) => {
			let allItems;
			switch(route){
				case 'orders': type = 1; allItems = res.data.foundAllOrders; break;
				case 'quotations': type= 2; allItems = res.data.foundAllQuotations; break;
			}
			const limit = this.state.limit;
			const pages = Math.ceil(allItems.length/limit)
			const page = pages >= 1 ? 1 : 0;
			const items = allItems.slice((page-1) * limit, limit * page);
			this.setState({ allItems, page, pages, items, type });
		})
		.catch((err => console.log(err)))
	}

	componentDidMount(){
    cargarAltura();
  }

  componentDidUpdate(){
    cargarAltura();
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
	
	getFilterItems = (search, select, type = this.state.type ) => {
		let filterItems = [];
		search = search ? search : search == '' ? '' : this.state.search;
		select = select ? select : select == '' ? '' : this.state.select;
		if(type == 1){
      filterItems = this.state.allItems.filter((t) => t.title && t.title.toLowerCase().includes(search.toLowerCase()));
		}else if(type == 2){
      filterItems = this.state.allItems.filter((t) => t.idOrder.title && t.idOrder.title.toLowerCase().includes(search.toLowerCase()));
		}
		if(select == 1){
			filterItems = filterItems.sort((a, b) => new Date(a.dateDelivery) - new Date(b.dateDelivery));
		}else if(select == 2){
			filterItems = filterItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		}
		return filterItems;
	}

	handleSelect = (e) => {
		const value = e.target.value;
    const page = 1;
    const limit = this.state.limit;
    const filterItems = this.getFilterItems(undefined, value);
    const pages = Math.ceil(filterItems.length / limit)
    const items = filterItems.slice((page-1) * limit, limit * page);
    this.setState({ page, items, select: value, pages, filterItems })
	}

  handleSearch = (e) => {
		const value = e.target.value;
    const page = 1;
		const limit = this.state.limit;
    const filterItems = this.getFilterItems(value);
    const pages = Math.ceil(filterItems.length / limit)
    const items = filterItems.slice((page-1) * limit, limit * page);
    this.setState({ page, items, search: value, pages, filterItems })
	}

  render(){
    return (
      <div>
				<div className="col-xs-12 filtrer-order">
					<div className="col-md-6 col-xs-12">
						<select className="selector-ordenar-por" id="filtrer-orders" onChange={this.handleSelect}>
							<option value="0">ORDENAR POR</option>
							<option value="1">Fecha de Entrega</option>
							<option value="2">Fecha de Creacion</option>
						</select>
					</div>
					<div className="col-md-6 col-xs-12">
						<div className="col-xs-12">
							<div className="input-group">
								<input className="form-control input-buscar-cotizaciones" type="text" onInput={this.handleSearch}/>
								<span className="input-group-btn">
									<button className="btn btn-default boton-buscar-cotizaciones" type="button">Buscar</button>
								</span>
							</div>
						</div>
					</div>
				</div>
				{
					this.state.items && this.state.items.map((i, k) => {
						let Item;
						switch(this.state.type){
							case 1: Item = <ProfileOrder order={i} key={k}/>; break;
							case 2: Item = <ProfileQuotation quotation={i} key={k}/>; break;
						}
						return Item;
					})
				}
				<Pagination goPage={this.goPage} previousPage={this.previousPage} nextPage={this.nextPage} pages={this.state.pages} page={this.state.page}/>
			</div>
    )
  }
}

const searchProfile = document.getElementById('search-profile');
searchProfile && render(<SearchProfile route={searchProfile.getAttribute('data-type')} />, searchProfile);