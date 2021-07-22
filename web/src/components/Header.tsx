import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "../styles/components/header.css";

type HeaderProps = {
  children?: string;
  menu?: string;
}

export function Header({ children, menu }: HeaderProps) {
  const { goBack } = useHistory();
  const history = useHistory();
  const user = localStorage.getItem('user');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'Você não pode acessar essa página.'
      }).then((result) => {

        if (result.isConfirmed) {
          history.push('/');
        }
      });
    }
  }, []);

  async function logoff() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    history.push('/');
  }

  return (
    <aside>
      <div className="goback">
        <button onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </div>

      <div className="title-menu">
        {children || "Processo Seletivo"}
      </div>

      <div className="container-menus">
        <div className="container-user">
          <label>Olá, {user}</label>
          <button onClick={logoff}>Sair</button>
        </div>
      </div>
    </aside>
  )
}