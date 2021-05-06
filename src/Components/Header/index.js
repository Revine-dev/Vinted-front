import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setSearch }) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <form className="search">
          <FontAwesomeIcon icon="search" />
          <input
            type="text"
            name="search-input"
            placeholder="Rechercher des articles"
            onChange={(e) => setSearch(e.target.value)}
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
      </div>
    </header>
  );
};

export default Header;
