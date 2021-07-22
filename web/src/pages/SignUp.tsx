import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import vaibem from "../assets/images/vaibem.svg";
import api from "../services/api";
import "../styles/pages/signup.css";

interface iValidationError {
  [key: string]: string[];
}

export function SignUp() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCofirm, setPasswordCofirm] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(password !== passwordCofirm) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'warning',
        title: 'Oops...',
        html: "As senhas digitadas não coincidem!"
      });

      return;
    }

    save();
  }

  async function save() {
    const data = {
      name,
      email,
      password,
    };

    await api.post('users', data)
      .then(res => handleSuccess('Cadastro realizado com sucesso!'))
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
        history.push('/');
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
    <div className="container-signup">
      <div className="container-form">
        <img src={vaibem} alt="Vai bem" />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h3>Cadastre-se</h3>
            
            <label>Nome:</label>
            <input 
              type="text"
              placeholder="Digite seu nome"
              value={ name }
              onChange={ event => setName(event.target.value) } />

            <label>Email:</label>
            <input 
              type="text"
              placeholder="Digite seu e-mail"
              value={ email }
              onChange={ event => setEmail(event.target.value) } />

            <label>Senha:</label>
            <input 
              type="password"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ event => setPassword(event.target.value) } />
            
            <label>Confirme a Senha:</label>
            <input 
              type="password"
              placeholder="Digite sua senha novamente"
              value={ passwordCofirm }
              onChange={ event => setPasswordCofirm(event.target.value) } />

            <button>Cadastrar-se</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}