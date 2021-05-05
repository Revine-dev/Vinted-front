import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardAd from "../Components/CardAd";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://vinted-appli.herokuapp.com/offers/"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="hero bg-img">
        <div className="container">
          <div className="header-action">
            <h1 className="title">Prêts à faire du tri dans vos placards ?</h1>
            <Link to="/">Commencez à vendre</Link>
          </div>
        </div>
      </section>

      <section className="container name">
        {isLoading ? (
          <div className="loading">Chargement en cours...</div>
        ) : (
          <div className="cards">
            {data.data.map((ads, i) => {
              return <CardAd key={i} {...ads} />;
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
