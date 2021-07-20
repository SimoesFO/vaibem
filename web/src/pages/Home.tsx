import "../styles/pages/home.css";

export function Home() {

  return (
    <div className="container-main">
      <div className="container-left">
        <h1>Processo Seletivo Vai Bem</h1>
        <form>
        <div className="div-element">
            <input type="text" placeholder="Entre com seu E-mail" />
          </div>

          <div className="div-element div-password">
            <input type="password" placeholder="Digite sua senha" />
            <a href='#'>Quero me cadastrar</a>
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