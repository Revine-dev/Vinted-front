import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ setSearch, token, setCookie, sessionName }) => {
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
          {!token ? (
            <>
              <Link to="/signup" className="btn connect">
                S'inscrire
              </Link>
              <Link to="/login" className="btn connect">
                Se connecter
              </Link>
            </>
          ) : (
            <Link
              to="/"
              className="btn connect"
              onClick={() => {
                Cookies.remove(sessionName);
                setCookie(false);
              }}
            >
              Se déconnecter
            </Link>
          )}
          <Link to="/" className="btn">
            Vends tes articles
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
