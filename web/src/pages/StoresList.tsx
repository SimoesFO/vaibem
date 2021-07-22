import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Header } from '../components/Header';
import api from "../services/api";
import "../styles/pages/stores-list.css";

type TypeStore = {
  id: string;
  name: string;
  description: string;
  uf: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
  }
}

export function StoresList() {
  const history = useHistory();
  
  const [stores, setStores] = useState<TypeStore[]>([]);
  const [search, setSearch] = useState('');

  function redirectTo() {
    history.push("/store");
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    api.get('stores', config)
      .then(res => {
        setStores(res.data);
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
      });
  }, []);


  async function find() {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    api.get(`stores?search=${search}`, config)
      .then(res => {
        setStores(res.data);
      })
      .catch(error => {
        if(error?.response?.status === 404) {
          setStores([]);
        }
        console.log(error?.response?.data?.message);
      });
  }


  async function remove(id: string) {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    api.delete(`stores/${id}`, config)
      .then(res => {
        api.get('stores', config)
          .then(res => {
            setStores(res.data);
            handleSuccess("Estabelecimento excluído com Sucesso");
          })
          .catch(error => {
            console.log(error?.response?.data?.message);
          });          
      })
      .catch(error => {
        console.log(error?.response?.data?.message);
      });
  }

  async function handleSuccess(message: string) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      html: message
    });
  }


  return (
    <div>
      
      <Header menu='stores' />

      <main>
        <div className="container">
          <div className="actions">
            <h3>Estabelecimentos</h3>
            <div className="new">
              <div className="search">
                <input 
                  type="text"
                  placeholder="Digite o termo que deseja buscar"
                  value={ search }
                  onChange={ event => setSearch(event.target.value) } />
                <button className="btn btn-search" onClick={find}>Pesquisar</button>
              </div>
              <button className="btn btn-primary" onClick={redirectTo}>Novo</button>
            </div>
          </div>

          <table width="100%" style={{borderSpacing:"0px"}}>
            <thead>
              <tr>
                <th>Estabelecimento</th>
                <th>Descrição</th>
                <th>UF</th>
                <th>Cidade</th>
                <th className="td-center">Editar</th>
                <th className="td-center">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {
                stores.length === 0 
                  ? <tr><td colSpan={6} align='center'>Nenhum estabelecimento foi encontrado.</td></tr>
                  : stores.map( store => {
                    return (
                      <tr key={ store.id }>
                        <td>{ store.name }</td>
                        <td>{ store.description }</td>
                        <td className="td-center">{store.uf}</td>
                        <td>{store.city}</td>
                        <td className="td-center">
                          <Link to={`/store/${store.id}`} className="btn btn-success">
                            Editar
                          </Link>
                        </td>
                        <td className="td-center">
                          <button className="btn btn-danger" onClick={ () => remove(store.id) }>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}