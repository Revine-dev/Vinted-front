import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardAd from "../Components/CardAd";

const Home = ({ search, priceRange }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-revine.onrender.com/offers/?title=${search}&page=${page}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search, page, priceRange]);

  const generatePagination = (pages) => {
    const result = [];
    for (let index = 1; index <= pages; index++) {
      result.push(index);
    }
    return result;
  };

  const goToPage = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  const isSold = (offerId) => {
    const find = data.sold.find((item) => item.offer._id === offerId);
    return find ? true : false;
  };

  return (
    <>
      <section className="hero bg-img">
        <div className="container">
          <div className="header-action">
            <h1 className="title">Prêts à faire du tri dans vos placards ?</h1>
            <Link to="/publish" className="btn">
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
                  let sold = isSold(ads._id);
                  return <CardAd key={i} {...ads} sold={sold} />;
                })}
              </div>
            ) : (
              <div className="notfound">Aucun résultat</div>
            )}

            {data.pages > 1 && (
              <div className="pages">
                {generatePagination(data.pages).map((pageI) => {
                  return (
                    <span key={pageI}>
                      {pageI === page ? (
                        <span className="current">Page {pageI}</span>
                      ) : (
                        <a href="/" onClick={(e) => goToPage(e, pageI)}>
                          Page {pageI}
                        </a>
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
