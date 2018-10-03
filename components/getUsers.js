import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Pagination } from './Pagination';
import { User } from './User';
import { Enterprise } from './Enterprise';
import { NotFoundItem } from './NotFound';

const base = 'https://alenber.herokuapp.com/api';

class Searchitems extends React.Component{

  state = {
    allUsers: [],
    items: [],
    token: null,
    pages: 0,
    page: 0,
    limit: 10,
    search: '',
    select: '',
    allCompanies: [],
    allItems: [],
  }

  componentWillMount(){
    const token = sessionStorage.getItem('user-token');
    Promise.all(
      [
        axios
          .get(base + '/admin/users', { headers: { 'authorization': 'Bearer ' + token } }),
        axios
          .get(base + '/search/enterprises', { headers: { 'authorization': 'Bearer ' + token } })
      ]
    )
    .then((promisesResponse) => {
      const apiUsers = promisesResponse[0] && promisesResponse[0].data;
      const apiEnterprises = promisesResponse[1] && promisesResponse[1].data;
      const limit = this.state.limit;
      let allUsers = [];
      let allCompanies = [];
      let allItems = [];
      if(apiUsers){
        allUsers = apiUsers.allUsers;
        allItems = allItems.concat(allUsers);
      }
      if(apiEnterprises){
        allCompanies = apiEnterprises.allEnterprises; 
        allItems = allItems.concat(allCompanies);
      }
      const pages = Math.ceil(allItems.length / limit);
      const page = pages == 0 ? 0 : 1;
      const items = allItems.slice((page-1) * limit, limit * page);
      this.setState({ allUsers, items, pages, page, token, allCompanies, allItems });
    })
    .catch((err) => console.log(err))
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

  selectChange = (e) => {
    const value = e.target.value;
    const page = 1;
    const limit = this.state.limit;
    let allItems = null;
    if(value == 0){
      allItems = this.state.allUsers.concat(this.state.allCompanies).filter((t) => (t.name && t.name.toLowerCase().includes(this.state.search.toLowerCase())) || (t.tradename && t.tradename.toLowerCase().includes(this.state.search.toLowerCase())));
    }else if(value == 1){
      allItems = this.state.allCompanies.filter((t) => t.tradename && t.tradename.toLowerCase().includes(this.state.search.toLowerCase()));
    }else if(value == 2){
      allItems = this.state.allUsers.filter((t) => t.name && t.name.toLowerCase().includes(this.state.search.toLowerCase()))
    }
    const items = allItems.slice((page-1) * limit, limit * page);
    const pages = Math.ceil(allItems.length/limit)
    this.setState({ items, page, select: value, pages, allItems })
  }

  handleSearch = (e) => {
    const value = e.target.value;
    const select = this.state.select;
    const page = 1;
    const limit = this.state.limit;
    let allItems = null;
    if(select == 0){
      allItems = this.state.allUsers.concat(this.state.allCompanies).filter((t) => (t.name && t.name.toLowerCase().includes(value.toLowerCase())) || (t.tradename && t.tradename.toLowerCase().includes(value.toLowerCase())));
    }else if(select == 1){
      allItems = this.state.allCompanies.filter((t) => t.tradename && t.tradename.toLowerCase().includes(value.toLowerCase()));
    }else if(select == 2){
      allItems = this.state.allUsers.filter((t) => t.name && t.name.toLowerCase().includes(value.toLowerCase()))
    }
    const pages = Math.ceil(allItems.length / limit)
    const items = allItems.slice((page-1) * limit, limit * page);
    this.setState({ page, items, search: value, pages, allItems })

  }

  render(){
    console.log(this.state.items);
    return (
      <div className="col-xs-12 ver-usuarios-buscar">
        <div className="col-md-3">
          <div className="col-xs-12">
            <br/>
            <select className="selectpicker" onChange={ this.selectChange }>
                <option value = "0">Ordenar por:</option>
                <option value = "1" >Empresas</option>
                <option value = "2">Usuarios</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col-xs-12">
            <br/>
            <input type="text" placeholder='Buscar usuarios' onInput={this.handleSearch}/>
          </div>
        </div>
        <div className="col-md-3">
          <div className="col-xs-12">
            <div className="descargar-repor">
              <img src="/img/ua/excel.png" alt=""/>
              <a href="#">Descargar</a>
            </div>
          </div>
        </div>
        {
          this.state.items && this.state.items.length != 0 ? this.state.items.map((u, k) => {
            return (<div className="col-xs-12 cuadro-conte-usuarios" key={k}>
              <div className="row">
                <div className="col-md-12 sinpa">
                  <div className="col-md-12 sinpa usuario-cuadro">
                    <div className="col-md-2  sinpa">
                      <div className="col-xs-12  sinpa contendor-img-user">
                        <center>
                        <img className="img-responsive" src={ u.tradename ? u.logo : u.photo } alt=""/>
                        </center>                        
                      </div>
                    </div>
                    {
                      u.tradename ? <Enterprise enterprise={u}/> : <User user={u} />
                    }
                    <div className="col-md-3 botones-users">
                      <div className="col-xs-12">
                        <br/>
                        <br/>
                        <a className="boton-editar-user btn" href={"/admin/usuarios/editar/"+u._id}> Editar 
                          <img className="img-responsive" src="/img/ua/edit.png" alt=""/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          }) : <NotFoundItem name="usuario"/>
        }
        <Pagination goPage={this.goPage} previousPage={this.previousPage} nextPage={this.nextPage} pages={this.state.pages} page={this.state.page} />
      </div>
    )
  }
}

const init = document.getElementById('search-users');
init && render(<Searchitems/>, init)