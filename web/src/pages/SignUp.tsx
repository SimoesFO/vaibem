import "../styles/pages/signup.css";
import vaibem from "../assets/images/vaibem.svg";

export function SignUp() {

  return (
    <div className="container-signup">
      <div className="container-form">
        <img src={vaibem} alt="Vai bem" />
        <form>
          <fieldset>
            <h3>Cadastre-se</h3>
            
            <label>Nome:</label>
            <input type="text" />

            <label>Email:</label>
            <input type="text" />

            <label>Senha:</label>
            <input type="password" />
            
            <label>Confirme a Senha:</label>
            <input type="password" />

            <button>Cadastrar-se</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}