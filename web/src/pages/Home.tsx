import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../services/api";
import "../styles/pages/home.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface iValidationError {
  [key: string]: string[];
}

export function Home() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    login();
  }

  async function login() {
    const data = {
      email,
      password,
    };

    await api.post('authenticate', data)
      .then(res => {
        const {user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', user?.name);

        history.push('stores');
      })
      .catch(error => {
        handleErrors(error);
      });
  }

  async function handleErrors(errors: AxiosError) {
    console.log(errors.response?.status);

    let title = 'Oops... Acesso não permitido';
    let messagesErrors = 'Verifique se o usuário e/ou senha estão corretos';
    if(errors.response?.status === 400) {
      const errorsAll = errors.response?.data?.errors as iValidationError[];
      const errorsData = Object.values(errorsAll);
      messagesErrors = errorsData.join("<br />");
    }

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      icon: 'error',
      title: title,
      html: messagesErrors
    })
  }

  return (
    <div className="container-main">
      <div className="container-left">
        <h1>Processo Seletivo<br />VaiBem</h1>
        <form onSubmit={handleSubmit}>
          <div className="div-element">
            <input 
              type="text" 
              placeholder="Entre com seu E-mail"
              value={ email }
              onChange={ event => setEmail(event.target.value) } />
          </div>

          <div className="div-element div-password">
            <input 
              type="password" 
              placeholder="Digite sua senha"
              value={ password }
              onChange={ event => setPassword(event.target.value) } />
            <Link to="/signup">Quero me cadastrar</Link>
          </div>

          <div className="div-element div-button">
            <button>Entrar</button>
          </div>
        </form>
      </div>

      <div className="container-right">
      </div>
    </div>
  )
}