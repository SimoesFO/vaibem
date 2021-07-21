import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
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

  function redirectTo() {
    history.push("/stores");
  }


  useEffect(() => {
    api.get('stores')
      .then(res => {
        setStores(res.data);
      })
      .catch(error => {
        //console.log(error.response.data.message);
      });
  }, []);


  async function remove(id: string) {

    api.delete(`stores/${id}`)
      .then(res => {
        api.get('stores')
          .then(res => {
            setStores(res.data);
          });

          handleSuccess("Estabelecimento excluído com Sucesso");
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
                          <Link to={`/stores/${store.id}`} className="btn btn-success">
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