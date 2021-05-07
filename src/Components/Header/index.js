import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import Filter from "./Filter";

const Header = ({
  setSearch,
  token,
  setCookie,
  priceRange,
  setPriceRange,
  sessionName,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const refMenu = useRef();
  const location = useLocation();

  const handleClickOutside = (event) => {
    if (
      (refMenu.current && !refMenu.current.contains(event.target)) ||
      (refMenu.current &&
        refMenu.current.contains(event.target) &&
        event.target.nodeName === "A")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [menuOpen]);

  return (
    <header className={location.pathname === "/" ? "header search" : "header"}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {location.pathname === "/" && (
          <form className="search">
            <FontAwesomeIcon icon="search" />
            <input
              type="text"
              name="search-input"
              placeholder="Rechercher des articles"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        )}
        <nav ref={refMenu}>
          <FontAwesomeIcon
            icon="bars"
            height="20"
            className="fa-w-20 menu-icon"
            onClick={() => {
              setMenuOpen(menuOpen ? false : true);
            }}
          />
          <div
            className="menu"
            style={{ display: menuOpen ? "block" : "none" }}
          >
            <Link to="/" className="btn home connect">
              Accueil
            </Link>
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
              <>
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
              </>
            )}
            <Link to="/" className="btn">
              Vends tes articles
            </Link>
          </div>
        </nav>
      </div>
      {location.pathname === "/" && (
        <div className="container filter">
          <Filter priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
      )}
    </header>
  );
};

export default Header;
