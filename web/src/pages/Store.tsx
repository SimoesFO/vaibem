import { AxiosError } from "axios";
import { useState, useEffect, FormEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from '../components/Header';
import api from "../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/pages/store.css';

type StoreParams = {
  id: string;
}

interface iValidationError {
  [key: string]: string[];
}

export function Store() {
  const { id } = useParams<StoreParams>();
  const { goBack } = useHistory();
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [situation, setSituation] = useState("true");

  useEffect(() => {
    if(id) {
      api.get(`stores/${id}`)
        .then(res => {
          setDescription(res.data.description);
          setSituation(res.data.situation);
        });
    }
  }, [id]);

  async function redirectToList(event: FormEvent) {
    event.preventDefault();
    goBack();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(id) {
      update();
      return;
    }

    save();
  }

  async function save() {
    const data = {
      description,
      situation: situation === "true",
    };

    await api.post('stores', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
      .catch(error => {
        handleErrors(error);
      });
  }

  async function update() {

    const data = {
      id,
      description,
      situation: situation === "true",
    }
    
    await api.put(`stores/${id}`, data)
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
        history.push('/storeslist');
      }
    });
  }
  
  async function handleErrors(errors: AxiosError) {
    const errorsAll = errors.response?.data?.errors as iValidationError[];

    const errorsData = Object.values(errorsAll);
    let messagesErrors = errorsData.join("<br />");

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
        <form>
          <h3>Estabelecimento</h3>
          
          <label>Nome:</label>
          <input type="text" />

          <label>Descrição</label>
          <input type="text" />

          <label>UF:</label>
          <input type="text" />
          
          <label>Cidade:</label>
          <input type="text" />

          <button>Salvar</button>
        </form>
      </main>
    </div>
  )
}