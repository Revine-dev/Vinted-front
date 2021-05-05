import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <div className="logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <form className="search">
        <input
          type="text"
          name="search-input"
          placeholder="Rechercher des articles"
        />
      </form>
      <nav>
        <Link to="/" className="btn connect">
          S'inscrire | Se connecter
        </Link>
        <Link to="/" className="btn">
          Vends tes articles
        </Link>
      </nav>
    </header>
  );
};

export default Header;
