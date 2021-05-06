import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardAd from "../Components/CardAd";

const Home = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-appli.herokuapp.com/offers/?title=${search}&page=${page}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search, page]);

  const generatePagination = (pages) => {
    const result = [];
    for (let index = 1; index <= pages; index++) {
      if (index !== page) {
        result.push(index);
      }
    }
    return result;
  };

  const goToPage = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <>
      <section className="hero bg-img">
        <div className="container">
          <div className="header-action">
            <h1 className="title">Prêts à faire du tri dans vos placards ?</h1>
            <Link to="/" className="btn">
              Commencez à vendre
            </Link>
          </div>
        </div>
      </section>

      <section className="container name">
        {isLoading ? (
          <div className="loading">Chargement en cours...</div>
        ) : (
          <>
            {data.data.length > 0 ? (
              <div className="cards">
                {data.data.map((ads, i) => {
                  return <CardAd key={i} {...ads} />;
                })}
              </div>
            ) : (
              <div className="notfound">Aucun résultat</div>
            )}

            {
              data.pages > 1 && (
                <div className="pages">
                  {generatePagination(data.pages).map((page) => {
                    return (
                      <a href="/" key={page} onClick={(e) => goToPage(e, page)}>
                        Page {page}
                      </a>
                    );
                  })}
                </div>
              )

              // <div className="pages">
              //   <a href="/" onClick={goNextPage}>
              //     Voir les résultats suivants
              //   </a>
              // </div>
            }
          </>
        )}
      </section>
    </>
  );
};

export default Home;
