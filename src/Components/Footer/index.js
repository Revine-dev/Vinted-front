import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname.match(/^\/offer\//)) {
    document.body.className = "grey";
  } else if (document.body.className === "grey") {
    document.body.removeAttribute("class");
  }

  return (
    <footer className="container">
      Vinted version created by{" "}
      <a href="https://github.com/Revine-dev" rel="noreferrer" target="_blank">
        Rémi
      </a>
    </footer>
  );
};

export default Footer;
