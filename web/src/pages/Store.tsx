import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Header } from '../components/Header';
import api from "../services/api";
import '../styles/pages/store.css';

type StoreParams = {
  id: string;
}

interface iValidationError {
  [key: string]: string[];
}

export function Store() {
  const { id } = useParams<StoreParams>();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if(id) {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      api.get(`stores/${id}`, config)
        .then(res => {
          setName(res.data.name);
          setDescription(res.data.description);
          setUf(res.data.uf);
          setCity(res.data.city);
        })
        .catch(error => {
          console.log(error?.response?.data?.message);
        });
    }
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(id) {
      update();
      return;
    }

    save();
  }

  async function save() {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const data = {
      name,
      description,
      uf,
      city,
    };

    await api.post('stores', data, config)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function update() {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const data = {
      id,
      name,
      description,
      uf,
      city,
    }
    
    await api.put(`stores/${id}`, data, config)
      .then(res => handleSuccess('Cadastro atualizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function handleSuccess(message: string) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'success',
      html: message
    }).then((result) => {

      if (result.isConfirmed) {
        history.push('/stores');
      }
    });
  }
  
  async function handleErrors(errors: AxiosError) {
    let messagesErrors = "Acesso não Autorizado";

    if(errors.response?.status === 400) {
      const errorsAll = errors.response?.data?.errors as iValidationError[];
      const errorsData = Object.values(errorsAll);
      messagesErrors = errorsData.join("<br />");
    }

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      html: messagesErrors
    })
  }
  
  return (
    <div>
      
      <Header menu='stores' />

      <main className="main-store">
        <form onSubmit={handleSubmit}>
          <h3>Estabelecimento</h3>
          
          <label>Nome</label>
          <input 
            type="text"
            placeholder="Digite o nome do estabelecimento"
            value={ name }
            onChange={ event => setName(event.target.value) } />

          <label>Descrição</label>
          <input 
            type="text"
            placeholder="Faça uma breve descrição"
            value={ description }
            onChange={ event => setDescription(event.target.value) } />

          <label>UF:</label>
          <input 
            type="text"
            placeholder="Digite a sigla do estado"
            value={ uf }
            onChange={ event => setUf(event.target.value) } />
          
          <label>Cidade:</label>
          <input 
            type="text"
            placeholder="Digite o nome da cidade"
            value={ city }
            onChange={ event => setCity(event.target.value) } />

          <button>Salvar</button>
        </form>
      </main>
    </div>
  )
}